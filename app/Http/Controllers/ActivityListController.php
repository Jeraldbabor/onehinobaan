<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Administrator\OfficialsController;
use App\Models\Activity;
use App\Models\Announcement;
use Inertia\Inertia;
use Inertia\Response;

class ActivityListController extends Controller
{
    /**
     * All published activities (public list).
     */
    public function index(): Response
    {
        $items = Activity::published()
            ->orderByRaw('COALESCE(published_at, created_at) DESC')
            ->get()
            ->map(fn (Activity $a) => [
                'id' => $a->id,
                'title' => $a->title,
                'content' => $a->content,
                'link_url' => $a->link_url,
                'image_url' => $a->image_path ? '/storage/'.$a->image_path : null,
                'published_at' => $a->published_at?->toISOString(),
            ])
            ->values()
            ->all();

        return Inertia::render('announcements/list', [
            'title' => 'Municipality Activities',
            'type' => 'activity',
            'items' => $items,
            'announcements' => Announcement::forSidebar(),
        ]);
    }

    /**
     * Show single activity (public).
     */
    public function show(int $id): Response
    {
        $activity = Activity::published()->findOrFail($id);
        $otherImagesUrls = collect($activity->other_images ?? [])
            ->map(fn ($path) => '/storage/'.$path)
            ->values()
            ->all();

        $item = [
            'id' => $activity->id,
            'title' => $activity->title,
            'content' => $activity->content,
            'link_url' => $activity->link_url,
            'image_url' => $activity->image_path ? '/storage/'.$activity->image_path : null,
            'other_images_urls' => $otherImagesUrls,
            'published_at' => $activity->published_at?->toISOString(),
        ];

        // Get officials data for the carousel
        $officials = app(OfficialsController::class)->getOfficialsForFrontend();

        return Inertia::render('announcements/show', [
            'title' => 'Municipality Activities',
            'listPath' => '/activities',
            'item' => $item,
            'announcements' => Announcement::forSidebar(),
            'mayor' => $officials['mayor'],
            'viceMayor' => $officials['vice_mayor'],
            'sbMembers' => $officials['sb_members'],
        ]);
    }
}
