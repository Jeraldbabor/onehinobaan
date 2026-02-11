<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\SiteContent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class BarangayController extends Controller
{
    private const IMAGE_DISK = 'public';

    private const IMAGE_DIR = 'barangays';

    /**
     * Show the public Barangay page (images only).
     */
    public function show(): Response
    {
        $barangays = $this->mapBarangaysForFrontend(SiteContent::getBarangaysList());

        return Inertia::render('about/barangay', [
            'barangays' => $barangays,
            'announcements' => Announcement::forSidebar(),
        ]);
    }

    /**
     * Show the admin page to manage barangay images (upload / remove).
     */
    public function index(): Response
    {
        $barangays = $this->mapBarangaysForFrontend(SiteContent::getBarangaysList());

        return Inertia::render('administrator/about-us/barangay-edit', [
            'barangays' => $barangays,
        ]);
    }

    /**
     * Store a new barangay image (image upload only).
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'image' => ['required', 'image', 'max:102400', 'mimes:jpeg,png,gif,webp'],
        ]);

        $file = $request->file('image');
        $path = $file->store(self::IMAGE_DIR, self::IMAGE_DISK);

        $list = SiteContent::getBarangaysList();
        $maxOrder = collect($list)->max('display_order') ?? 0;
        $list[] = [
            'id' => Str::random(8),
            'image_path' => $path,
            'display_order' => $maxOrder + 1,
        ];
        SiteContent::setBarangaysList($list);

        return back()->with('status', 'Barangay image added.');
    }

    /**
     * Remove a barangay image and delete its file.
     */
    public function destroy(string $id): RedirectResponse
    {
        $list = SiteContent::getBarangaysList();
        $found = null;
        $filtered = [];
        foreach ($list as $item) {
            if (($item['id'] ?? '') === $id) {
                $found = $item;
            } else {
                $filtered[] = $item;
            }
        }
        if ($found && ! empty($found['image_path'])) {
            Storage::disk(self::IMAGE_DISK)->delete($found['image_path']);
        }
        SiteContent::setBarangaysList($filtered);

        return back()->with('status', 'Barangay image removed.');
    }

    /**
     * @param  array<int, array{id: string, image_path: string, display_order: int}>  $list
     * @return array<int, array{id: string, image_url: string}>
     */
    private function mapBarangaysForFrontend(array $list): array
    {
        return array_map(function ($item) {
            $path = $item['image_path'] ?? '';

            return [
                'id' => $item['id'] ?? '',
                'image_url' => $path ? '/storage/'.$path : '',
            ];
        }, $list);
    }
}
