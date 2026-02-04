<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class SiteContent extends Model
{
    public const KEY_HISTORY = 'history';

    public const KEY_VISION = 'vision';

    public const KEY_MISSION = 'mission';

    public const KEY_VISION_MISSION_IMAGE = 'vision_mission_image';

    public const KEY_OFFICIALS = 'officials';

    public const KEY_BARANGAYS = 'barangays';

    protected $fillable = ['key', 'content', 'image_path'];

    /**
     * Get the full URL for the image (for public disk).
     */
    public function getImageUrlAttribute(): ?string
    {
        if (! $this->image_path) {
            return null;
        }

        return Storage::disk('public')->url($this->image_path);
    }

    /**
     * Get content by key, creating a blank record if it doesn't exist.
     */
    public static function getByKey(string $key): ?self
    {
        return self::firstOrCreate(
            ['key' => $key],
            ['content' => '']
        );
    }

    /**
     * Get officials list from JSON content. Each item: ['id' => string, 'image_path' => string, 'display_order' => int].
     *
     * @return array<int, array{id: string, image_path: string, display_order: int}>
     */
    public static function getOfficialsList(): array
    {
        $row = self::getByKey(self::KEY_OFFICIALS);
        $decoded = $row->content ? json_decode($row->content, true) : null;

        if (! is_array($decoded)) {
            return [];
        }

        usort($decoded, fn ($a, $b) => ($a['display_order'] ?? 0) <=> ($b['display_order'] ?? 0));

        return $decoded;
    }

    /**
     * Save officials list as JSON content.
     *
     * @param  array<int, array{id: string, image_path: string, display_order: int}>  $list
     */
    public static function setOfficialsList(array $list): void
    {
        $row = self::getByKey(self::KEY_OFFICIALS);
        $row->content = json_encode(array_values($list));
        $row->save();
    }

    /**
     * Get barangays list from JSON content. Each item: ['id' => string, 'image_path' => string, 'display_order' => int].
     *
     * @return array<int, array{id: string, image_path: string, display_order: int}>
     */
    public static function getBarangaysList(): array
    {
        $row = self::getByKey(self::KEY_BARANGAYS);
        $decoded = $row->content ? json_decode($row->content, true) : null;

        if (! is_array($decoded)) {
            return [];
        }

        usort($decoded, fn ($a, $b) => ($a['display_order'] ?? 0) <=> ($b['display_order'] ?? 0));

        return $decoded;
    }

    /**
     * Save barangays list as JSON content.
     *
     * @param  array<int, array{id: string, image_path: string, display_order: int}>  $list
     */
    public static function setBarangaysList(array $list): void
    {
        $row = self::getByKey(self::KEY_BARANGAYS);
        $row->content = json_encode(array_values($list));
        $row->save();
    }
}
