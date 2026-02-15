<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Announcement;
use App\Models\Project;
use App\Models\TourismItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->input('q');
        $results = [];

        if ($query) {
            // Search Activities
            $activities = Activity::published()
                ->where(function ($q) use ($query) {
                    $q->where('title', 'like', "%{$query}%")
                      ->orWhere('content', 'like', "%{$query}%");
                })
                ->get()
                ->map(function ($item) {
                    return [
                        'type' => 'Activity',
                        'title' => $item->title,
                        'description' => Str::limit(strip_tags($item->content), 150),
                        'url' => route('activities.show', $item->id), // Assuming route name
                        'image' => $item->image_path ? asset('storage/' . $item->image_path) : null,
                        'date' => $item->published_at,
                    ];
                });

            // Search Announcements
            $announcements = Announcement::published()
                ->where(function ($q) use ($query) {
                    $q->where('title', 'like', "%{$query}%")
                      ->orWhere('content', 'like', "%{$query}%");
                })
                ->get()
                ->map(function ($item) {
                    $routeName = match ($item->type) {
                        'news' => 'news.show',
                        'update' => 'updates.show',
                        'announcement' => 'announcements.show',
                        default => 'news.show',
                    };
                    
                    return [
                        'type' => Str::ucfirst($item->type),
                        'title' => $item->title,
                        'description' => Str::limit(strip_tags($item->content), 150),
                        'url' => $item->link_url ?? route($routeName, $item->id),
                        'image' => $item->image_path ? asset('storage/' . $item->image_path) : null,
                        'date' => $item->published_at,
                    ];
                });

            // Search Projects
            $projects = Project::published()
                ->where(function ($q) use ($query) {
                    $q->where('title', 'like', "%{$query}%")
                      ->orWhere('description', 'like', "%{$query}%");
                })
                ->get()
                ->map(function ($item) {
                    return [
                        'type' => 'Project',
                        'title' => $item->title,
                        'description' => Str::limit(strip_tags($item->description), 150),
                        'url' => route('projects.show', $item->id),
                        'image' => $item->image_path ? asset('storage/' . $item->image_path) : null,
                        'date' => $item->published_at,
                    ];
                });
            
             // Search Tourism
            $tourism = TourismItem::where('title', 'like', "%{$query}%")
                ->orWhere('description', 'like', "%{$query}%")
                ->get()
                ->map(function ($item) {
                    return [
                        'type' => 'Tourism',
                        'title' => $item->title,
                        'description' => Str::limit(strip_tags($item->description), 150),
                        'url' => route('tourism.item', ['type' => $item->type, 'id' => $item->id]),
                        'image' => $item->image_url,
                        'date' => $item->created_at,
                    ];
                });


            $results = $activities->concat($announcements)
                ->concat($projects)
                ->concat($tourism)
                ->sortByDesc('date')
                ->values();
        }

        if ($request->wantsJson()) {
            return response()->json($results);
        }

        return Inertia::render('Search/Index', [
            'query' => $query,
            'results' => $results,
        ]);
    }
}
