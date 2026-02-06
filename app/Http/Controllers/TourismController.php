<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\TourismItem;
use Inertia\Inertia;
use Inertia\Response;

class TourismController extends Controller
{
    /**
     * Show public tourism page for a given type (attraction, resort, festival).
     */
    public function show(string $type): Response
    {
        $typeMap = [
            'attraction' => TourismItem::TYPE_ATTRACTION,
            'resorts' => TourismItem::TYPE_RESORT,
            'festivals' => TourismItem::TYPE_FESTIVAL,
        ];
        $internalType = $typeMap[$type] ?? TourismItem::TYPE_ATTRACTION;
        $titleMap = [
            TourismItem::TYPE_ATTRACTION => 'Attraction',
            TourismItem::TYPE_RESORT => 'Resorts',
            TourismItem::TYPE_FESTIVAL => 'Festivals',
        ];

        $items = TourismItem::ofType($internalType)->with('images')->get()->map(fn (TourismItem $item) => [
            'id' => $item->id,
            'title' => $item->title,
            'description' => $item->description,
            'address' => $item->address,
            'email' => $item->email,
            'contact_number' => $item->contact_number,
            'image_url' => $item->image_url,
            'image_urls' => $item->images->map(fn ($img) => $img->image_url)->values()->all(),
        ]);

        return Inertia::render('tourism/show', [
            'type' => $type,
            'title' => $titleMap[$internalType],
            'items' => $items,
            'announcements' => Announcement::forSidebar(),
        ]);
    }

    /**
     * Show a single tourism item (attraction, resort, or festival) on its own page.
     */
    public function showItem(string $type, int $id): Response
    {
        $typeMap = [
            'attraction' => TourismItem::TYPE_ATTRACTION,
            'resorts' => TourismItem::TYPE_RESORT,
            'festivals' => TourismItem::TYPE_FESTIVAL,
        ];
        $internalType = $typeMap[$type] ?? TourismItem::TYPE_ATTRACTION;
        $titleMap = [
            TourismItem::TYPE_ATTRACTION => 'Attraction',
            TourismItem::TYPE_RESORT => 'Resorts',
            TourismItem::TYPE_FESTIVAL => 'Festivals',
        ];

        $item = TourismItem::ofType($internalType)->with('images')->findOrFail($id);
        $itemData = [
            'id' => $item->id,
            'title' => $item->title,
            'description' => $item->description,
            'address' => $item->address,
            'email' => $item->email,
            'contact_number' => $item->contact_number,
            'social_media_url' => $item->social_media_url,
            'map_embed_url' => $item->map_embed_url,
            'image_url' => $item->image_url,
            'image_urls' => $item->images->map(fn ($img) => $img->image_url)->values()->all(),
        ];

        return Inertia::render('tourism/item', [
            'type' => $type,
            'title' => $titleMap[$internalType],
            'item' => $itemData,
            'announcements' => Announcement::forSidebar(),
        ]);
    }
}
