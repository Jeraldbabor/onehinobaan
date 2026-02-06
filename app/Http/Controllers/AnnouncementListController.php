<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Inertia\Inertia;
use Inertia\Response;

class AnnouncementListController extends Controller
{
    /**
     * Map announcement to frontend item.
     *
     * @return array{id: int, title: string, content: string, link_url: string|null, image_url: string|null, type: string, published_at: string|null}
     */
    private static function toItem(Announcement $a): array
    {
        return [
            'id' => $a->id,
            'title' => $a->title,
            'content' => $a->content,
            'link_url' => $a->link_url,
            'image_url' => $a->image_path ? '/storage/'.$a->image_path : null,
            'type' => $a->type,
            'published_at' => $a->published_at?->toISOString(),
        ];
    }

    /**
     * All published news (type = news).
     */
    public function news(): Response
    {
        $items = Announcement::published()
            ->where('type', Announcement::TYPE_NEWS)
            ->orderByRaw('COALESCE(published_at, created_at) DESC')
            ->get()
            ->map(fn (Announcement $a) => self::toItem($a))
            ->values()
            ->all();

        return Inertia::render('announcements/list', [
            'title' => 'News',
            'type' => 'news',
            'items' => $items,
            'announcements' => Announcement::forSidebar(),
        ]);
    }

    /**
     * All published updates (type = update).
     */
    public function updates(): Response
    {
        $items = Announcement::published()
            ->where('type', Announcement::TYPE_UPDATE)
            ->orderByRaw('COALESCE(published_at, created_at) DESC')
            ->get()
            ->map(fn (Announcement $a) => self::toItem($a))
            ->values()
            ->all();

        return Inertia::render('announcements/list', [
            'title' => 'Updates',
            'type' => 'update',
            'items' => $items,
            'announcements' => Announcement::forSidebar(),
        ]);
    }

    /**
     * All published announcements (type = announcement).
     */
    public function announcements(): Response
    {
        $items = Announcement::published()
            ->where('type', Announcement::TYPE_ANNOUNCEMENT)
            ->orderByRaw('COALESCE(published_at, created_at) DESC')
            ->get()
            ->map(fn (Announcement $a) => self::toItem($a))
            ->values()
            ->all();

        return Inertia::render('announcements/list', [
            'title' => 'Announcements',
            'type' => 'announcement',
            'items' => $items,
            'announcements' => Announcement::forSidebar(),
        ]);
    }

    /**
     * Show single news item (type = news).
     */
    public function showNews(int $id): Response
    {
        return $this->showItem($id, Announcement::TYPE_NEWS, 'News', 'news');
    }

    /**
     * Show single update item (type = update).
     */
    public function showUpdate(int $id): Response
    {
        return $this->showItem($id, Announcement::TYPE_UPDATE, 'Updates', 'updates');
    }

    /**
     * Show single announcement item (type = announcement).
     */
    public function showAnnouncement(int $id): Response
    {
        return $this->showItem($id, Announcement::TYPE_ANNOUNCEMENT, 'Announcements', 'announcements');
    }

    /**
     * Show single item; validate type and return detail page.
     */
    private function showItem(int $id, string $expectedType, string $title, string $listPath): Response
    {
        $announcement = Announcement::published()->findOrFail($id);
        if ($announcement->type !== $expectedType) {
            abort(404);
        }
        $item = self::toItem($announcement);

        return Inertia::render('announcements/show', [
            'title' => $title,
            'listPath' => '/'.$listPath,
            'item' => $item,
            'announcements' => Announcement::forSidebar(),
        ]);
    }
}
