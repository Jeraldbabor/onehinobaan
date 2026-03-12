<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /**
     * Display a listing of all published projects.
     */
    public function index(): Response
    {
        $projects = Project::published()
            ->orderByRaw('COALESCE(published_at, created_at) DESC')
            ->paginate(12)
            ->through(fn (Project $p) => [
                'id'           => $p->id,
                'title'        => $p->title,
                'description'  => $p->description,
                'status'       => $p->status,
                'link_url'     => $p->link_url,
                'image_url'    => $p->image_path ? '/storage/'.$p->image_path : null,
                'video_url'    => $p->video_path ? '/storage/'.$p->video_path : null,
                'published_at' => $p->published_at?->toISOString(),
            ]);

        return Inertia::render('projects/index', [
            'projects'      => $projects,
            'announcements' => Announcement::forSidebar(),
        ]);
    }

    /**
     * Display the specified project.
     */
    public function show(int $id): Response
    {
        $project = Project::published()->findOrFail($id);

        $otherImagesUrls = collect($project->other_images ?? [])
            ->map(fn ($path) => '/storage/'.$path)
            ->values()
            ->all();

        return Inertia::render('projects/show', [
            'project' => [
                'id' => $project->id,
                'title' => $project->title,
                'description' => $project->description,
                'status' => $project->status,
                'link_url' => $project->link_url,
                'image_url' => $project->image_path ? '/storage/'.$project->image_path : null,
                'video_url' => $project->video_path ? '/storage/'.$project->video_path : null,
                'other_images_urls' => $otherImagesUrls,
                'published_at' => $project->published_at?->toISOString(),
            ],
        ]);
    }
}
