<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Models\TourismItem;
use App\Models\TourismItemImage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TourismController extends Controller
{
    private const IMAGE_DISK = 'public';

    private const IMAGE_DIR = 'tourism';

    private function getTypeFromRoute(): string
    {
        $name = request()->route()?->getName() ?? '';
        if (str_contains($name, 'attraction')) {
            return TourismItem::TYPE_ATTRACTION;
        }
        if (str_contains($name, 'resorts')) {
            return TourismItem::TYPE_RESORT;
        }
        if (str_contains($name, 'festivals')) {
            return TourismItem::TYPE_FESTIVAL;
        }

        return TourismItem::TYPE_ATTRACTION;
    }

    private const PAGE_VIEW_MAP = [
        TourismItem::TYPE_ATTRACTION => 'administrator/tourism/attraction-edit',
        TourismItem::TYPE_RESORT => 'administrator/tourism/resorts-edit',
        TourismItem::TYPE_FESTIVAL => 'administrator/tourism/festivals-edit',
    ];

    /**
     * List items and show the admin edit page for the given tourism type.
     */
    public function index(): Response
    {
        $type = $this->getTypeFromRoute();
        $items = TourismItem::ofType($type)->with('images')->get()->map(function (TourismItem $item) {
            $imageUrls = $item->images->map(fn ($img) => [
                'id' => $img->id,
                'image_url' => $img->image_url,
            ])->values()->all();

            return [
                'id' => $item->id,
                'title' => $item->title,
                'description' => $item->description,
                'address' => $item->address,
                'email' => $item->email,
                'contact_number' => $item->contact_number,
                'social_media_url' => $item->social_media_url,
                'map_embed_url' => $item->map_embed_url,
                'map_latitude' => $item->map_latitude,
                'map_longitude' => $item->map_longitude,
                'image_url' => $item->image_url,
                'image_urls' => $imageUrls,
                'order_column' => $item->order_column,
            ];
        });

        return Inertia::render(self::PAGE_VIEW_MAP[$type], [
            'items' => $items,
            'type' => $type,
        ]);
    }

    /**
     * Store a new tourism item with one or more images.
     */
    public function store(Request $request): RedirectResponse
    {
        $type = $this->getTypeFromRoute();
        $files = $request->file('images');
        $files = is_array($files) ? $files : ($files ? [$files] : []);
        $request->merge(['images' => $files]);
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:65535'],
            'address' => ['nullable', 'string', 'max:500'],
            'email' => ['nullable', 'email', 'max:255'],
            'contact_number' => ['nullable', 'string', 'max:50'],
            'social_media_url' => ['nullable', 'string', 'url', 'max:500'],
            'map_latitude' => ['nullable', 'numeric', 'between:-90,90'],
            'map_longitude' => ['nullable', 'numeric', 'between:-180,180'],
            'images' => ['required', 'array', 'min:1'],
            'images.*' => ['image', 'max:102400', 'mimes:jpeg,png,gif,webp'],
        ]);

        $maxOrder = TourismItem::ofType($type)->max('order_column') ?? 0;
        $item = TourismItem::create([
            'type' => $type,
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'address' => $request->input('address'),
            'email' => $request->input('email'),
            'contact_number' => $request->input('contact_number'),
            'social_media_url' => $request->input('social_media_url'),
            'map_embed_url' => $request->input('map_embed_url'),
            'map_latitude' => $request->input('map_latitude') ?: null,
            'map_longitude' => $request->input('map_longitude') ?: null,
            'order_column' => $maxOrder + 1,
        ]);

        $order = 0;
        foreach ($files as $file) {
            $path = $file->store(self::IMAGE_DIR, self::IMAGE_DISK);
            $item->images()->create([
                'image_path' => $path,
                'order_column' => $order++,
            ]);
        }

        return back()->with('status', 'Item added.');
    }

    /**
     * Update an existing tourism item; optionally add more images.
     */
    public function update(Request $request, int $id): RedirectResponse
    {
        $type = $this->getTypeFromRoute();
        $item = TourismItem::where('type', $type)->findOrFail($id);

        $rules = [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:65535'],
            'address' => ['nullable', 'string', 'max:500'],
            'email' => ['nullable', 'email', 'max:255'],
            'contact_number' => ['nullable', 'string', 'max:50'],
            'social_media_url' => ['nullable', 'string', 'url', 'max:500'],
            'map_latitude' => ['nullable', 'numeric', 'between:-90,90'],
            'map_longitude' => ['nullable', 'numeric', 'between:-180,180'],
        ];
        if ($request->hasFile('images')) {
            $rules['images'] = ['array'];
            $rules['images.*'] = ['image', 'max:102400', 'mimes:jpeg,png,gif,webp'];
        }
        $request->validate($rules);

        $item->update([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'address' => $request->input('address'),
            'email' => $request->input('email'),
            'contact_number' => $request->input('contact_number'),
            'social_media_url' => $request->input('social_media_url'),
            'map_embed_url' => $request->input('map_embed_url'),
            'map_latitude' => $request->input('map_latitude') ?: null,
            'map_longitude' => $request->input('map_longitude') ?: null,
        ]);

        if ($request->hasFile('images')) {
            $newFiles = $request->file('images');
            $newFiles = is_array($newFiles) ? $newFiles : [$newFiles];
            $maxOrder = $item->images()->max('order_column') ?? -1;
            $order = $maxOrder + 1;
            foreach ($newFiles as $file) {
                $path = $file->store(self::IMAGE_DIR, self::IMAGE_DISK);
                $item->images()->create([
                    'image_path' => $path,
                    'order_column' => $order++,
                ]);
            }
        }

        return back()->with('status', 'Item updated.');
    }

    /**
     * Remove a tourism item and all its images.
     */
    public function destroy(int $id): RedirectResponse
    {
        $type = $this->getTypeFromRoute();
        $item = TourismItem::where('type', $type)->findOrFail($id);
        foreach ($item->images as $image) {
            $image->delete();
        }
        $item->delete();

        return back()->with('status', 'Item removed.');
    }

    /**
     * Remove a single image from a tourism item.
     */
    public function destroyImage(int $imageId): RedirectResponse
    {
        $type = $this->getTypeFromRoute();
        $image = TourismItemImage::whereHas('tourismItem', fn ($q) => $q->where('type', $type))
            ->findOrFail($imageId);
        $image->delete();

        return back()->with('status', 'Image removed.');
    }
}
