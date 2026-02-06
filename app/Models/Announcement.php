<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    public const TYPE_NEWS = 'news';

    public const TYPE_UPDATE = 'update';

    public const TYPE_ANNOUNCEMENT = 'announcement';

    protected $fillable = [
        'title',
        'content',
        'link_url',
        'image_path',
        'type',
        'published_at',
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    public function scopePublished($query)
    {
        return $query->where(function ($q) {
            $q->whereNull('published_at')
                ->orWhere('published_at', '<=', now());
        });
    }

    /**
     * Latest 3 per type (announcement, news, update) for the public sidebar = 9 items max.
     * Merged and ordered by date (newest first).
     *
     * @return array<int, array{id: int, title: string, content: string, link_url: string|null, image_url: string|null, type: string, published_at: string|null}>
     */
    public static function forSidebar(): array
    {
        $order = 'COALESCE(published_at, created_at) DESC';
        $perType = 3;

        $announcements = self::published()
            ->where('type', self::TYPE_ANNOUNCEMENT)
            ->orderByRaw($order)
            ->take($perType)
            ->get();
        $news = self::published()
            ->where('type', self::TYPE_NEWS)
            ->orderByRaw($order)
            ->take($perType)
            ->get();
        $updates = self::published()
            ->where('type', self::TYPE_UPDATE)
            ->orderByRaw($order)
            ->take($perType)
            ->get();

        $merged = $announcements->concat($news)->concat($updates);

        return $merged
            ->sortByDesc(fn (self $a) => $a->published_at ?? $a->created_at)
            ->take(9)
            ->values()
            ->map(fn (self $a) => [
                'id' => $a->id,
                'title' => $a->title,
                'content' => $a->content,
                'link_url' => $a->link_url,
                'image_url' => $a->image_path ? '/storage/'.$a->image_path : null,
                'type' => $a->type,
                'published_at' => $a->published_at?->toISOString(),
            ])
            ->values()
            ->all();
    }

    /**
     * @return array<string, string>
     */
    public static function types(): array
    {
        return [
            self::TYPE_NEWS => 'News',
            self::TYPE_UPDATE => 'Update',
            self::TYPE_ANNOUNCEMENT => 'Announcement',
        ];
    }
}
