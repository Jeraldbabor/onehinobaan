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
     * Get officials data for landing page (e.g. carousel).
     *
     * @return array{mayor: array|null, vice_mayor: array|null, sb_members: array}
     */
    public function getOfficialsForFrontend(): array
    {
        return $this->mapOfficialsForFrontend(SiteContent::getOfficials());
    }

    /**
     * Show the public Key Officials page (mayor, vice mayor, SB members).
     * Optional $section: 'mayor' | 'vice-mayor' | 'sb-member' to show only that section.
     */
    public function show(?string $section = null): Response
    {
        $data = $this->mapOfficialsForFrontend(SiteContent::getOfficials());

        return Inertia::render('about/officials', [
            'section' => $section,
            'mayor' => $data['mayor'],
            'viceMayor' => $data['vice_mayor'],
            'sbMembers' => $data['sb_members'],
            'announcements' => Announcement::forSidebar(),
        ]);
    }

    /**
     * Show the admin page to manage officials (mayor, vice mayor, SB members).
     */
    public function index(): Response
    {
        $data = $this->mapOfficialsForFrontend(SiteContent::getOfficials());

        return Inertia::render('administrator/about-us/officials-edit', [
            'mayor' => $data['mayor'],
            'viceMayor' => $data['vice_mayor'],
            'sbMembers' => $data['sb_members'],
        ]);
    }

    /**
     * Update mayor (name + optional image).
     */
    public function updateMayor(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:255'],
            'detail' => ['nullable', 'string', 'max:2000'],
            'image' => ['nullable', 'image', 'max:102400', 'mimes:jpeg,png,gif,webp'],
        ]);

        $officials = SiteContent::getOfficials();
        $mayor = $officials['mayor'] ?? null;
        if (! is_array($mayor)) {
            $mayor = ['id' => Str::random(8), 'name' => '', 'title' => 'Municipal Mayor', 'image_path' => '', 'detail' => ''];
        }

        $mayor['name'] = $request->input('name', $mayor['name'] ?? '');
        $mayor['title'] = $request->input('title', $mayor['title'] ?? 'Municipal Mayor');
        $mayor['detail'] = $request->input('detail', $mayor['detail'] ?? '');

        if ($request->hasFile('image')) {
            if (! empty($mayor['image_path'])) {
                Storage::disk(self::IMAGE_DISK)->delete($mayor['image_path']);
            }
            $mayor['image_path'] = $request->file('image')->store(self::IMAGE_DIR, self::IMAGE_DISK);
        }

        $officials['mayor'] = $mayor;
        SiteContent::setOfficials($officials);

        return back()->with('status', 'Mayor updated.');
    }

    /**
     * Update vice mayor (name + optional image).
     */
    public function updateViceMayor(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:255'],
            'detail' => ['nullable', 'string', 'max:2000'],
            'image' => ['nullable', 'image', 'max:102400', 'mimes:jpeg,png,gif,webp'],
        ]);

        $officials = SiteContent::getOfficials();
        $viceMayor = $officials['vice_mayor'] ?? null;
        if (! is_array($viceMayor)) {
            $viceMayor = ['id' => Str::random(8), 'name' => '', 'title' => 'Vice Mayor', 'image_path' => '', 'detail' => ''];
        }

        $viceMayor['name'] = $request->input('name', $viceMayor['name'] ?? '');
        $viceMayor['title'] = $request->input('title', $viceMayor['title'] ?? 'Vice Mayor');
        $viceMayor['detail'] = $request->input('detail', $viceMayor['detail'] ?? '');

        if ($request->hasFile('image')) {
            if (! empty($viceMayor['image_path'])) {
                Storage::disk(self::IMAGE_DISK)->delete($viceMayor['image_path']);
            }
            $viceMayor['image_path'] = $request->file('image')->store(self::IMAGE_DIR, self::IMAGE_DISK);
        }

        $officials['vice_mayor'] = $viceMayor;
        SiteContent::setOfficials($officials);

        return back()->with('status', 'Vice Mayor updated.');
    }

    /**
     * Add an SB member (name + image).
     */
    public function storeSbMember(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:255'],
            'detail' => ['nullable', 'string', 'max:2000'],
            'image' => ['required', 'image', 'max:102400', 'mimes:jpeg,png,gif,webp'],
        ]);

        $officials = SiteContent::getOfficials();
        $sbMembers = $officials['sb_members'];
        $maxOrder = collect($sbMembers)->max('display_order') ?? 0;

        $path = $request->file('image')->store(self::IMAGE_DIR, self::IMAGE_DISK);
        $sbMembers[] = [
            'id' => Str::random(8),
            'name' => $request->input('name', ''),
            'title' => $request->input('title', 'SB Member'),
            'detail' => $request->input('detail', ''),
            'image_path' => $path,
            'display_order' => $maxOrder + 1,
        ];
        $officials['sb_members'] = $sbMembers;
        SiteContent::setOfficials($officials);

        return back()->with('status', 'SB Member added.');
    }

    /**
     * Update an SB member (name + optional image).
     */
    public function updateSbMember(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:255'],
            'detail' => ['nullable', 'string', 'max:2000'],
            'image' => ['nullable', 'image', 'max:102400', 'mimes:jpeg,png,gif,webp'],
        ]);

        $officials = SiteContent::getOfficials();
        $sbMembers = $officials['sb_members'];
        $found = null;
        $key = null;
        foreach ($sbMembers as $i => $m) {
            if (($m['id'] ?? '') === $id) {
                $found = $m;
                $key = $i;
                break;
            }
        }
        if ($found === null || $key === null) {
            return back()->withErrors(['official' => 'SB Member not found.']);
        }

        $found['name'] = $request->input('name', $found['name'] ?? '');
        $found['title'] = $request->input('title', $found['title'] ?? 'SB Member');
        $found['detail'] = $request->input('detail', $found['detail'] ?? '');

        if ($request->hasFile('image')) {
            if (! empty($found['image_path'])) {
                Storage::disk(self::IMAGE_DISK)->delete($found['image_path']);
            }
            $found['image_path'] = $request->file('image')->store(self::IMAGE_DIR, self::IMAGE_DISK);
        }

        $sbMembers[$key] = $found;
        $officials['sb_members'] = $sbMembers;
        SiteContent::setOfficials($officials);

        return back()->with('status', 'SB Member updated.');
    }

    /**
     * Remove an SB member.
     */
    public function destroySbMember(string $id): RedirectResponse
    {
        $officials = SiteContent::getOfficials();
        $sbMembers = $officials['sb_members'];
        $filtered = [];
        $found = null;
        foreach ($sbMembers as $m) {
            if (($m['id'] ?? '') === $id) {
                $found = $m;
            } else {
                $filtered[] = $m;
            }
        }
        if ($found && ! empty($found['image_path'])) {
            Storage::disk(self::IMAGE_DISK)->delete($found['image_path']);
        }
        $officials['sb_members'] = $filtered;
        SiteContent::setOfficials($officials);

        return back()->with('status', 'SB Member removed.');
    }

    /**
     * Map stored officials to frontend shape (image_url, etc.).
     *
     * @param  array{mayor: array|null, vice_mayor: array|null, sb_members: array}  $data
     * @return array{mayor: array|null, vice_mayor: array|null, sb_members: array}
     */
    private function mapOfficialsForFrontend(array $data): array
    {
        $mapOne = function (?array $item): ?array {
            if (! $item) {
                return null;
            }
            $path = $item['image_path'] ?? '';

            return [
                'id' => $item['id'] ?? '',
                'name' => $item['name'] ?? '',
                'title' => $item['title'] ?? '',
                'detail' => $item['detail'] ?? '',
                'image_url' => $path ? '/storage/'.$path : '',
            ];
        };

        $sb = array_map(function ($m) {
            $path = $m['image_path'] ?? '';

            return [
                'id' => $m['id'] ?? '',
                'name' => $m['name'] ?? '',
                'title' => $m['title'] ?? 'SB Member',
                'detail' => $m['detail'] ?? '',
                'image_url' => $path ? '/storage/'.$path : '',
                'display_order' => $m['display_order'] ?? 0,
            ];
        }, $data['sb_members'] ?? []);

        return [
            'mayor' => $mapOne($data['mayor'] ?? null),
            'vice_mayor' => $mapOne($data['vice_mayor'] ?? null),
            'sb_members' => $sb,
        ];
    }
}
