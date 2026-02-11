<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    private const IMAGE_DISK = 'public';

    private const IMAGE_DIR = 'projects';

    public function index(): Response
    {
        $projects = Project::orderByDesc('published_at')
            ->orderByDesc('created_at')
            ->get()
            ->map(fn (Project $p) => [
                'id' => $p->id,
                'title' => $p->title,
                'description' => $p->description,
                'status' => $p->status,
                'link_url' => $p->link_url,
                'image_url' => $p->image_path ? '/storage/'.$p->image_path : null,
                'video_url' => $p->video_path ? '/storage/'.$p->video_path : null,
                'published_at' => $p->published_at?->toISOString(),
                'created_at' => $p->created_at->toISOString(),
            ]);

        return Inertia::render('administrator/projects/index', [
            'projects' => $projects,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('administrator/projects/form', [
            'project' => null,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'status' => ['required', 'string', 'in:ongoing,completed'],
            'link_url' => ['nullable', 'string', 'max:500', 'url'],
            'image' => ['nullable', 'image', 'max:5120', 'mimes:jpeg,png,gif,webp'],
            'video' => ['nullable', 'file', 'mimetypes:video/mp4,video/quicktime', 'max:40960'],
            'other_images' => ['nullable', 'array', 'max:10'],
            'other_images.*' => ['image', 'max:5120', 'mimes:jpeg,png,gif,webp'],
            'published_at' => ['nullable', 'date'],
        ]);

        $publishedAt = $request->filled('published_at')
            ? Carbon::parse($request->input('published_at'), config('app.timezone'))
            : now();

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store(self::IMAGE_DIR, self::IMAGE_DISK);
        }

        $videoPath = null;
        if ($request->hasFile('video')) {
            $videoPath = $request->file('video')->store(self::IMAGE_DIR, self::IMAGE_DISK);
        }

        $otherImages = [];
        if ($request->hasFile('other_images')) {
            foreach ($request->file('other_images') as $file) {
                $otherImages[] = $file->store(self::IMAGE_DIR, self::IMAGE_DISK);
            }
        }

        Project::create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'status' => $request->input('status'),
            'link_url' => $request->filled('link_url') ? $request->input('link_url') : null,
            'image_path' => $imagePath,
            'video_path' => $videoPath,
            'other_images' => $otherImages,
            'published_at' => $publishedAt,
        ]);

        return redirect()->route('projects.manage.index')->with('status', 'Project created.');
    }

    public function edit(int $id): Response
    {
        $project = Project::findOrFail($id);
        $otherImagesUrls = collect($project->other_images ?? [])
            ->map(fn ($path) => '/storage/'.$path)
            ->values()
            ->all();

        return Inertia::render('administrator/projects/form', [
            'project' => [
                'id' => $project->id,
                'title' => $project->title,
                'description' => $project->description,
                'status' => $project->status,
                'link_url' => $project->link_url ?? '',
                'image_url' => $project->image_path ? '/storage/'.$project->image_path : null,
                'video_url' => $project->video_path ? '/storage/'.$project->video_path : null,
                'other_images_urls' => $otherImagesUrls,
                'published_at' => $project->published_at?->format('Y-m-d\TH:i'),
                'created_at' => $project->created_at->toISOString(),
            ],
        ]);
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'status' => ['required', 'string', 'in:ongoing,completed'],
            'link_url' => ['nullable', 'string', 'max:500', 'url'],
            'image' => ['nullable', 'image', 'max:5120', 'mimes:jpeg,png,gif,webp'],
            'remove_image' => ['nullable', 'boolean'],
            'video' => ['nullable', 'file', 'mimetypes:video/mp4,video/quicktime', 'max:40960'],
            'remove_video' => ['nullable', 'boolean'],
            'other_images' => ['nullable', 'array', 'max:10'],
            'other_images.*' => ['image', 'max:5120', 'mimes:jpeg,png,gif,webp'],
            'remove_other_images' => ['nullable', 'array'],
            'remove_other_images.*' => ['integer'],
            'published_at' => ['nullable', 'date'],
        ]);

        $project = Project::findOrFail($id);
        $publishedAt = $request->filled('published_at')
            ? Carbon::parse($request->input('published_at'), config('app.timezone'))
            : now();

        $imagePath = $project->image_path;
        if ($request->boolean('remove_image') && $imagePath) {
            Storage::disk(self::IMAGE_DISK)->delete($imagePath);
            $imagePath = null;
        }
        if ($request->hasFile('image')) {
            if ($project->image_path) {
                Storage::disk(self::IMAGE_DISK)->delete($project->image_path);
            }
            $imagePath = $request->file('image')->store(self::IMAGE_DIR, self::IMAGE_DISK);
        }

        $videoPath = $project->video_path;
        if ($request->boolean('remove_video') && $videoPath) {
            Storage::disk(self::IMAGE_DISK)->delete($videoPath);
            $videoPath = null;
        }
        if ($request->hasFile('video')) {
            if ($project->video_path) {
                Storage::disk(self::IMAGE_DISK)->delete($project->video_path);
            }
            $videoPath = $request->file('video')->store(self::IMAGE_DIR, self::IMAGE_DISK);
        }

        // Handle other images
        $existingOtherImages = $project->other_images ?? [];
        $removeIndices = $request->input('remove_other_images', []);

        // Remove specified images
        foreach ($removeIndices as $index) {
            if (isset($existingOtherImages[$index])) {
                Storage::disk(self::IMAGE_DISK)->delete($existingOtherImages[$index]);
                unset($existingOtherImages[$index]);
            }
        }
        $existingOtherImages = array_values($existingOtherImages);

        // Add new images
        if ($request->hasFile('other_images')) {
            foreach ($request->file('other_images') as $file) {
                $existingOtherImages[] = $file->store(self::IMAGE_DIR, self::IMAGE_DISK);
            }
        }

        $project->update([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'status' => $request->input('status'),
            'link_url' => $request->filled('link_url') ? $request->input('link_url') : null,
            'image_path' => $imagePath,
            'video_path' => $videoPath,
            'other_images' => $existingOtherImages,
            'published_at' => $publishedAt,
        ]);

        return redirect()->route('projects.manage.index')->with('status', 'Project updated.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $project = Project::findOrFail($id);
        if ($project->image_path) {
            Storage::disk(self::IMAGE_DISK)->delete($project->image_path);
        }
        if ($project->video_path) {
            Storage::disk(self::IMAGE_DISK)->delete($project->video_path);
        }
        // Delete other images
        foreach ($project->other_images ?? [] as $path) {
            Storage::disk(self::IMAGE_DISK)->delete($path);
        }
        $project->delete();

        return back()->with('status', 'Project removed.');
    }
}
