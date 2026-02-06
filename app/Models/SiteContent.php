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

    public const KEY_CONTACT = 'contact';

    protected $fillable = ['key', 'content', 'image_path'];

    /**
     * Default structure for contact settings (address, phone, email, map_embed_url, facebook URLs).
     *
     * @return array{address: string, phone: string, email: string, map_embed_url: string, facebook_municipality_url: string, facebook_mayor_url: string}
     */
    public static function getContactDefaults(): array
    {
        return [
            'address' => '',
            'phone' => '',
            'email' => '',
            'map_embed_url' => '',
            'facebook_municipality_url' => '',
            'facebook_mayor_url' => '',
        ];
    }

    /**
     * Get contact settings from database (address, phone, email, map_embed_url).
     *
     * @return array{address: string, phone: string, email: string, map_embed_url: string, facebook_municipality_url: string, facebook_mayor_url: string}
     */
    public static function getContact(): array
    {
        $row = self::getByKey(self::KEY_CONTACT);
        $decoded = $row->content ? json_decode($row->content, true) : null;
        if (! is_array($decoded)) {
            return self::getContactDefaults();
        }

        return array_merge(self::getContactDefaults(), $decoded);
    }

    /**
     * Save contact settings.
     *
     * @param  array{address?: string, phone?: string, email?: string, map_embed_url?: string, facebook_municipality_url?: string, facebook_mayor_url?: string}  $data
     */
    public static function setContact(array $data): void
    {
        $current = self::getContact();
        $merged = array_merge($current, array_filter($data, fn ($v) => $v !== null));
        $row = self::getByKey(self::KEY_CONTACT);
        $row->content = json_encode([
            'address' => $merged['address'] ?? '',
            'phone' => $merged['phone'] ?? '',
            'email' => $merged['email'] ?? '',
            'map_embed_url' => $merged['map_embed_url'] ?? '',
            'facebook_municipality_url' => $merged['facebook_municipality_url'] ?? '',
            'facebook_mayor_url' => $merged['facebook_mayor_url'] ?? '',
        ]);
        $row->save();
    }

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
     * Default structure for key officials (mayor, vice mayor, SB members).
     *
     * @return array{mayor: null, vice_mayor: null, sb_members: array}
     */
    public static function getOfficialsDefaults(): array
    {
        return [
            'mayor' => null,
            'vice_mayor' => null,
            'sb_members' => [],
        ];
    }

    /**
     * Get officials structured as mayor, vice_mayor, sb_members.
     * Legacy: if content is a flat array, it is migrated to sb_members (names empty).
     *
     * @return array{mayor: array{id: string, name: string, title: string, image_path: string}|null, vice_mayor: array{id: string, name: string, title: string, image_path: string}|null, sb_members: array<int, array{id: string, name: string, title: string, image_path: string, display_order: int}>}
     */
    public static function getOfficials(): array
    {
        $row = self::getByKey(self::KEY_OFFICIALS);
        $decoded = $row->content ? json_decode($row->content, true) : null;

        if (! is_array($decoded)) {
            return self::getOfficialsDefaults();
        }

        // Legacy: content was a flat list of officials (image only)
        if (isset($decoded[0]) && array_key_exists('image_path', $decoded[0] ?? []) && ! isset($decoded['mayor'])) {
            $list = $decoded;
            usort($list, fn ($a, $b) => ($a['display_order'] ?? 0) <=> ($b['display_order'] ?? 0));
            $sb = [];
            foreach ($list as $i => $item) {
                $sb[] = [
                    'id' => $item['id'] ?? \Illuminate\Support\Str::random(8),
                    'name' => '',
                    'title' => 'SB Member',
                    'image_path' => $item['image_path'] ?? '',
                    'display_order' => $i + 1,
                ];
            }
            return [
                'mayor' => null,
                'vice_mayor' => null,
                'sb_members' => $sb,
            ];
        }

        $mayor = $decoded['mayor'] ?? null;
        $viceMayor = $decoded['vice_mayor'] ?? null;
        $sbMembers = $decoded['sb_members'] ?? [];
        if (! is_array($sbMembers)) {
            $sbMembers = [];
        }
        usort($sbMembers, fn ($a, $b) => ($a['display_order'] ?? 0) <=> ($b['display_order'] ?? 0));

        return [
            'mayor' => is_array($mayor) ? array_merge(['id' => '', 'name' => '', 'title' => 'Municipal Mayor', 'image_path' => ''], $mayor) : null,
            'vice_mayor' => is_array($viceMayor) ? array_merge(['id' => '', 'name' => '', 'title' => 'Vice Mayor', 'image_path' => ''], $viceMayor) : null,
            'sb_members' => array_values($sbMembers),
        ];
    }

    /**
     * Save officials (mayor, vice_mayor, sb_members).
     *
     * @param  array{mayor?: array|null, vice_mayor?: array|null, sb_members?: array}  $data
     */
    public static function setOfficials(array $data): void
    {
        $current = self::getOfficials();
        $mayor = $data['mayor'] ?? $current['mayor'];
        $viceMayor = $data['vice_mayor'] ?? $current['vice_mayor'];
        $sbMembers = $data['sb_members'] ?? $current['sb_members'];
        $row = self::getByKey(self::KEY_OFFICIALS);
        $row->content = json_encode([
            'mayor' => $mayor,
            'vice_mayor' => $viceMayor,
            'sb_members' => array_values($sbMembers),
        ]);
        $row->save();
    }

    /**
     * Get officials list from JSON content (legacy flat list). Prefer getOfficials().
     *
     * @return array<int, array{id: string, image_path: string, display_order: int}>
     */
    public static function getOfficialsList(): array
    {
        $structured = self::getOfficials();
        $list = [];
        if ($structured['mayor'] && ! empty($structured['mayor']['image_path'])) {
            $list[] = [
                'id' => $structured['mayor']['id'],
                'image_path' => $structured['mayor']['image_path'],
                'display_order' => 0,
            ];
        }
        if ($structured['vice_mayor'] && ! empty($structured['vice_mayor']['image_path'])) {
            $list[] = [
                'id' => $structured['vice_mayor']['id'],
                'image_path' => $structured['vice_mayor']['image_path'],
                'display_order' => 1,
            ];
        }
        foreach ($structured['sb_members'] as $i => $m) {
            if (! empty($m['image_path'])) {
                $list[] = [
                    'id' => $m['id'],
                    'image_path' => $m['image_path'],
                    'display_order' => 2 + $i,
                ];
            }
        }
        return $list;
    }

    /**
     * Save officials list (legacy). Prefer setOfficials(). Converts flat list into mayor/vice_mayor/sb_members (first = mayor, second = vice mayor, rest = sb_members).
     *
     * @param  array<int, array{id: string, image_path: string, display_order: int}>  $list
     */
    public static function setOfficialsList(array $list): void
    {
        usort($list, fn ($a, $b) => ($a['display_order'] ?? 0) <=> ($b['display_order'] ?? 0));
        $mayor = null;
        $viceMayor = null;
        $sbMembers = [];
        foreach ($list as $i => $item) {
            $entry = [
                'id' => $item['id'] ?? \Illuminate\Support\Str::random(8),
                'name' => '',
                'title' => $i === 0 ? 'Municipal Mayor' : ($i === 1 ? 'Vice Mayor' : 'SB Member'),
                'image_path' => $item['image_path'] ?? '',
                'display_order' => $i,
            ];
            if ($i === 0) {
                $mayor = $entry;
            } elseif ($i === 1) {
                $viceMayor = $entry;
            } else {
                $entry['display_order'] = $i - 2;
                $sbMembers[] = $entry;
            }
        }
        self::setOfficials(['mayor' => $mayor, 'vice_mayor' => $viceMayor, 'sb_members' => $sbMembers]);
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
