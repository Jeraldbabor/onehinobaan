<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ActivityController extends Controller
{
    private const IMAGE_DISK = 'public';

    private const IMAGE_DIR = 'activities';

    public function index(): Response
    {
        $activities = Activity::orderByDesc('published_at')
            ->orderByDesc('created_at')
            ->get()
            ->map(fn (Activity $a) => [
                'id' => $a->id,
                'title' => $a->title,
                'content' => $a->content,
                'link_url' => $a->link_url,
                'image_url' => $a->image_path ? '/storage/'.$a->image_path : null,
                'published_at' => $a->published_at?->toISOString(),
                'created_at' => $a->created_at->toISOString(),
            ]);

        return Inertia::render('administrator/activities/index', [
            'activities' => $activities,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('administrator/activities/form', [
            'activity' => null,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'link_url' => ['nullable', 'string', 'max:500', 'url'],
            'image' => ['nullable', 'image', 'max:5120', 'mimes:jpeg,png,gif,webp'],
            'published_at' => ['nullable', 'date'],
        ]);

        $publishedAt = $request->filled('published_at')
            ? Carbon::parse($request->input('published_at'), config('app.timezone'))
            : now();

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store(self::IMAGE_DIR, self::IMAGE_DISK);
        }

        Activity::create([
            'title' => $request->input('title'),
            'content' => $request->input('content'),
            'link_url' => $request->filled('link_url') ? $request->input('link_url') : null,
            'image_path' => $imagePath,
            'published_at' => $publishedAt,
        ]);

        return redirect()->route('activities.manage.index')->with('status', 'Activity created.');
    }

    public function edit(int $id): Response
    {
        $activity = Activity::findOrFail($id);

        return Inertia::render('administrator/activities/form', [
            'activity' => [
                'id' => $activity->id,
                'title' => $activity->title,
                'content' => $activity->content,
                'link_url' => $activity->link_url ?? '',
                'image_url' => $activity->image_path ? '/storage/'.$activity->image_path : null,
                'published_at' => $activity->published_at?->format('Y-m-d\TH:i'),
                'created_at' => $activity->created_at->toISOString(),
            ],
        ]);
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'link_url' => ['nullable', 'string', 'max:500', 'url'],
            'image' => ['nullable', 'image', 'max:5120', 'mimes:jpeg,png,gif,webp'],
            'remove_image' => ['nullable', 'boolean'],
            'published_at' => ['nullable', 'date'],
        ]);

        $activity = Activity::findOrFail($id);
        $publishedAt = $request->filled('published_at')
            ? Carbon::parse($request->input('published_at'), config('app.timezone'))
            : now();

        $imagePath = $activity->image_path;
        if ($request->boolean('remove_image') && $imagePath) {
            Storage::disk(self::IMAGE_DISK)->delete($imagePath);
            $imagePath = null;
        }
        if ($request->hasFile('image')) {
            if ($activity->image_path) {
                Storage::disk(self::IMAGE_DISK)->delete($activity->image_path);
            }
            $imagePath = $request->file('image')->store(self::IMAGE_DIR, self::IMAGE_DISK);
        }

        $activity->update([
            'title' => $request->input('title'),
            'content' => $request->input('content'),
            'link_url' => $request->filled('link_url') ? $request->input('link_url') : null,
            'image_path' => $imagePath,
            'published_at' => $publishedAt,
        ]);

        return redirect()->route('activities.manage.index')->with('status', 'Activity updated.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $activity = Activity::findOrFail($id);
        if ($activity->image_path) {
            Storage::disk(self::IMAGE_DISK)->delete($activity->image_path);
        }
        $activity->delete();

        return back()->with('status', 'Activity removed.');
    }
}
