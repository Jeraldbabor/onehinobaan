<?php

namespace App\Http\Controllers;

use App\Models\JobOpportunity;
use Inertia\Inertia;
use Inertia\Response;

class JobOpportunityController extends Controller
{
    public function index(): Response
    {
        $jobs = JobOpportunity::published()
            ->orderByDesc('published_at')
            ->orderByDesc('created_at')
            ->paginate(12)
            ->through(fn (JobOpportunity $job) => [
                'id' => $job->id,
                'title' => $job->title,
                'description' => $job->description,
                'image_url' => $job->image_path ? '/storage/'.$job->image_path : null,
                'file_url' => $job->file_path ? '/storage/'.$job->file_path : null,
                'employment_type' => $job->employment_type,
                'published_at' => $job->published_at->toISOString(),
            ]);

        return Inertia::render('jobs/index', [
            'jobs' => $jobs,
            'announcements' => \App\Models\Announcement::forSidebar(),
        ]);
    }

    public function show(int $id): Response
    {
        $job = JobOpportunity::published()->findOrFail($id);

        return Inertia::render('jobs/show', [
            'job' => [
                'id' => $job->id,
                'title' => $job->title,
                'description' => $job->description,
                'image_url' => $job->image_path ? '/storage/'.$job->image_path : null,
                'file_url' => $job->file_path ? '/storage/'.$job->file_path : null,
                'employment_type' => $job->employment_type,
                'published_at' => $job->published_at->toISOString(),
            ],
            'announcements' => \App\Models\Announcement::forSidebar(),
        ]);
    }
}
