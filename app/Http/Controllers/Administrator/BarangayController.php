<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\Barangay;
use App\Models\BarangayOfficial;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class BarangayController extends Controller
{
    private const IMAGE_DISK = 'public';
    private const IMAGE_DIR = 'barangays';
    private const OFFICIAL_IMAGE_DIR = 'barangay_officials';

    /**
     * Show the public Barangay page.
     */
    public function show(): Response
    {
        $barangays = Barangay::orderBy('display_order')->get()->map(function ($item) {
            return [
                'id' => $item->id,
                'name' => $item->name,
                'population' => $item->population,
                'history' => $item->history,
                'festival' => $item->festival,
                'land_area' => $item->land_area,
                'officials' => $item->officials, // Legacy text field
                'image_url' => $item->image_path ? '/storage/'.$item->image_path : null,
            ];
        });

        return Inertia::render('about/barangay', [
            'barangays' => $barangays,
            'announcements' => Announcement::forSidebar(),
        ]);
    }

    /**
     * Show the public Barangay Detail page with Officials.
     */
    public function showDetail(string $id): Response
    {
        $barangay = Barangay::with('officialsList')->findOrFail($id);

        return Inertia::render('about/barangay-detail', [
            'barangay' => [
                'id' => $barangay->id,
                'name' => $barangay->name,
                'population' => $barangay->population,
                'history' => $barangay->history,
                'festival' => $barangay->festival,
                'land_area' => $barangay->land_area,
                'officials_text' => $barangay->officials,
                'image_url' => $barangay->image_path ? '/storage/'.$barangay->image_path : null,
                'officials' => $barangay->officialsList->map(fn($o) => [
                    'id' => $o->id,
                    'name' => $o->name,
                    'position' => $o->position,
                    'image_url' => $o->image_path ? '/storage/'.$o->image_path : null,
                ]),
            ],
            'announcements' => Announcement::forSidebar(),
        ]);
    }

    /**
     * Show the admin page to manage barangays.
     */
    public function index(): Response
    {
        $barangays = Barangay::with('officialsList')->orderBy('display_order')->get()->map(function ($item) {
            return [
                'id' => $item->id,
                'name' => $item->name,
                'population' => $item->population,
                'history' => $item->history,
                'festival' => $item->festival,
                'land_area' => $item->land_area,
                'officials' => $item->officials,
                'image_url' => $item->image_path ? '/storage/'.$item->image_path : null,
                'officials_list' => $item->officialsList->map(fn($o) => [
                    'id' => $o->id,
                    'name' => $o->name,
                    'position' => $o->position,
                    'image_url' => $o->image_path ? '/storage/'.$o->image_path : null,
                ]),
            ];
        });

        return Inertia::render('administrator/about-us/barangay-edit', [
            'barangays' => $barangays,
        ]);
    }

    /**
     * Store a new barangay.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'population' => ['nullable', 'string', 'max:255'],
            'history' => ['nullable', 'string'],
            'festival' => ['nullable', 'string', 'max:255'],
            'land_area' => ['nullable', 'string', 'max:255'],
            'officials' => ['nullable', 'string'],
            'image' => ['required', 'image', 'max:102400', 'mimes:jpeg,png,gif,webp'],
        ]);

        $path = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store(self::IMAGE_DIR, self::IMAGE_DISK);
        }

        Barangay::create([
            'name' => $request->name,
            'population' => $request->population,
            'history' => $request->history,
            'festival' => $request->festival,
            'land_area' => $request->land_area,
            'officials' => $request->officials,
            'image_path' => $path,
            'display_order' => Barangay::max('display_order') + 1,
        ]);

        return back()->with('status', 'Barangay added.');
    }

    /**
     * Update an existing barangay.
     */
    public function update(Request $request, $id): RedirectResponse
    {
        $barangay = Barangay::findOrFail($id);

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'population' => ['nullable', 'string', 'max:255'],
            'history' => ['nullable', 'string'],
            'festival' => ['nullable', 'string', 'max:255'],
            'land_area' => ['nullable', 'string', 'max:255'],
            'officials' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'max:102400', 'mimes:jpeg,png,gif,webp'],
        ]);

        if ($request->hasFile('image')) {
            if ($barangay->image_path) {
                Storage::disk(self::IMAGE_DISK)->delete($barangay->image_path);
            }
            $barangay->image_path = $request->file('image')->store(self::IMAGE_DIR, self::IMAGE_DISK);
        }

        $barangay->update([
            'name' => $request->name,
            'population' => $request->population,
            'history' => $request->history,
            'festival' => $request->festival,
            'land_area' => $request->land_area,
            'officials' => $request->officials,
        ]);

        return back()->with('status', 'Barangay updated.');
    }

    /**
     * Remove a barangay.
     */
    public function destroy(string $id): RedirectResponse
    {
        $barangay = Barangay::findOrFail($id);
        
        // Delete officials images
        foreach ($barangay->officialsList as $official) {
            if ($official->image_path) {
                Storage::disk(self::IMAGE_DISK)->delete($official->image_path);
            }
        }

        if ($barangay->image_path) {
            Storage::disk(self::IMAGE_DISK)->delete($barangay->image_path);
        }
        
        $barangay->delete();

        return back()->with('status', 'Barangay removed.');
    }

    /**
     * Store a new official for a barangay.
     */
    public function storeOfficial(Request $request, string $barangayId): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'position' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'max:102400', 'mimes:jpeg,png,gif,webp'],
        ]);

        $path = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store(self::OFFICIAL_IMAGE_DIR, self::IMAGE_DISK);
        }

        BarangayOfficial::create([
            'barangay_id' => $barangayId,
            'name' => $request->name,
            'position' => $request->position,
            'image_path' => $path,
            'display_order' => BarangayOfficial::where('barangay_id', $barangayId)->max('display_order') + 1,
        ]);

        return back()->with('status', 'Official added.');
    }

    /**
     * Remove a barangay official.
     */
    public function destroyOfficial(string $id): RedirectResponse
    {
        $official = BarangayOfficial::findOrFail($id);
        
        if ($official->image_path) {
            Storage::disk(self::IMAGE_DISK)->delete($official->image_path);
        }
        
        $official->delete();

        return back()->with('status', 'Official removed.');
    }
}
