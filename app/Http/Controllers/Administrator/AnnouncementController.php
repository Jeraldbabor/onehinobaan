<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AnnouncementController extends Controller
{
    private const IMAGE_DISK = 'public';

    private const IMAGE_DIR = 'announcements';

    /**
     * List announcements and show admin index page.
     */
    public function index(): Response
    {
        $announcements = Announcement::orderByDesc('published_at')
            ->orderByDesc('created_at')
            ->get()
            ->map(fn (Announcement $a) => [
                'id' => $a->id,
                'title' => $a->title,
                'content' => $a->content,
                'link_url' => $a->link_url,
                'image_url' => $a->image_path ? '/storage/'.$a->image_path : null,
                'type' => $a->type,
                'published_at' => $a->published_at?->toISOString(),
                'created_at' => $a->created_at->toISOString(),
            ]);

        return Inertia::render('administrator/announcements/index', [
            'announcements' => $announcements,
        ]);
    }

    /**
     * Show create form.
     */
    public function create(): Response
    {
        return Inertia::render('administrator/announcements/form', [
            'announcement' => null,
        ]);
    }

    /**
     * Store a new announcement.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'link_url' => ['nullable', 'string', 'max:500', 'url'],
            'image' => ['nullable', 'image', 'max:5120', 'mimes:jpeg,png,gif,webp'],
            'type' => ['required', 'string', 'in:news,update,announcement'],
            'published_at' => ['nullable', 'date'],
        ]);

        $publishedAt = $request->filled('published_at')
            ? Carbon::parse($request->input('published_at'), config('app.timezone'))
            : now();

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store(self::IMAGE_DIR, self::IMAGE_DISK);
        }

        Announcement::create([
            'title' => $request->input('title'),
            'content' => $request->input('content'),
            'link_url' => $request->filled('link_url') ? $request->input('link_url') : null,
            'image_path' => $imagePath,
            'type' => $request->input('type'),
            'published_at' => $publishedAt,
        ]);

        return redirect()->route('announcements.index')->with('status', 'Announcement created.');
    }

    /**
     * Show edit form.
     */
    public function edit(int $id): Response
    {
        $announcement = Announcement::findOrFail($id);

        return Inertia::render('administrator/announcements/form', [
            'announcement' => [
                'id' => $announcement->id,
                'title' => $announcement->title,
                'content' => $announcement->content,
                'link_url' => $announcement->link_url ?? '',
                'image_url' => $announcement->image_path ? '/storage/'.$announcement->image_path : null,
                'type' => $announcement->type,
                'published_at' => $announcement->published_at?->format('Y-m-d\TH:i'),
                'created_at' => $announcement->created_at->toISOString(),
            ],
        ]);
    }

    /**
     * Update an announcement.
     */
    public function update(Request $request, int $id): RedirectResponse
    {
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'link_url' => ['nullable', 'string', 'max:500', 'url'],
            'image' => ['nullable', 'image', 'max:5120', 'mimes:jpeg,png,gif,webp'],
            'remove_image' => ['nullable', 'boolean'],
            'type' => ['required', 'string', 'in:news,update,announcement'],
            'published_at' => ['nullable', 'date'],
        ]);

        $announcement = Announcement::findOrFail($id);
        $publishedAt = $request->filled('published_at')
            ? Carbon::parse($request->input('published_at'), config('app.timezone'))
            : now();

        $imagePath = $announcement->image_path;
        if ($request->boolean('remove_image') && $imagePath) {
            Storage::disk(self::IMAGE_DISK)->delete($imagePath);
            $imagePath = null;
        }
        if ($request->hasFile('image')) {
            if ($announcement->image_path) {
                Storage::disk(self::IMAGE_DISK)->delete($announcement->image_path);
            }
            $imagePath = $request->file('image')->store(self::IMAGE_DIR, self::IMAGE_DISK);
        }

        $announcement->update([
            'title' => $request->input('title'),
            'content' => $request->input('content'),
            'link_url' => $request->filled('link_url') ? $request->input('link_url') : null,
            'image_path' => $imagePath,
            'type' => $request->input('type'),
            'published_at' => $publishedAt,
        ]);

        return redirect()->route('announcements.index')->with('status', 'Announcement updated.');
    }

    /**
     * Delete an announcement.
     */
    public function destroy(int $id): RedirectResponse
    {
        $announcement = Announcement::findOrFail($id);
        if ($announcement->image_path) {
            Storage::disk(self::IMAGE_DISK)->delete($announcement->image_path);
        }
        $announcement->delete();

        return back()->with('status', 'Announcement removed.');
    }
}
