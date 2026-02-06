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

class OfficialsController extends Controller
{
    private const IMAGE_DISK = 'public';

    private const IMAGE_DIR = 'officials';

    /**
     * Show the public Key Officials page (images only).
     */
    public function show(): Response
    {
        $officials = $this->mapOfficialsForFrontend(SiteContent::getOfficialsList());

        return Inertia::render('about/officials', [
            'officials' => $officials,
            'announcements' => Announcement::forSidebar(),
        ]);
    }

    /**
     * Show the admin page to manage officials (upload / remove images).
     */
    public function index(): Response
    {
        $officials = $this->mapOfficialsForFrontend(SiteContent::getOfficialsList());

        return Inertia::render('administrator/about-us/officials-edit', [
            'officials' => $officials,
        ]);
    }

    /**
     * Store a new official (image upload only).
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'image' => ['required', 'image', 'max:102400', 'mimes:jpeg,png,gif,webp'],
        ]);

        $file = $request->file('image');
        $path = $file->store(self::IMAGE_DIR, self::IMAGE_DISK);

        $list = SiteContent::getOfficialsList();
        $maxOrder = collect($list)->max('display_order') ?? 0;
        $list[] = [
            'id' => Str::random(8),
            'image_path' => $path,
            'display_order' => $maxOrder + 1,
        ];
        SiteContent::setOfficialsList($list);

        return back()->with('status', 'Official added.');
    }

    /**
     * Remove an official and delete its image.
     */
    public function destroy(string $id): RedirectResponse
    {
        $list = SiteContent::getOfficialsList();
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
        SiteContent::setOfficialsList($filtered);

        return back()->with('status', 'Official removed.');
    }

    /**
     * @param  array<int, array{id: string, image_path: string, display_order: int}>  $list
     * @return array<int, array{id: string, image_url: string}>
     */
    private function mapOfficialsForFrontend(array $list): array
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
