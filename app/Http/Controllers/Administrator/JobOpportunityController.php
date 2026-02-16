<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Models\JobOpportunity;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class JobOpportunityController extends Controller
{
    private const FILE_DISK = 'public';

    private const FILE_DIR = 'job_opportunities';

    public function index(): Response
    {
        $jobs = JobOpportunity::orderByDesc('published_at')
            ->orderByDesc('created_at')
            ->paginate(10)
            ->through(fn (JobOpportunity $job) => [
                'id' => $job->id,
                'title' => $job->title,
                'description' => $job->description,
                'image_url' => $job->image_path ? '/storage/'.$job->image_path : null,
                'file_url' => $job->file_path ? '/storage/'.$job->file_path : null,
                'employment_type' => $job->employment_type,
                'published_at' => $job->published_at?->toISOString(),
                'created_at' => $job->created_at->toISOString(),
            ]);

        return Inertia::render('administrator/Jobs/Index', [
            'jobs' => $jobs,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('administrator/Jobs/Form', [
            'job' => null,
        ]);
    }

    public function edit(int $id): Response
    {
        $job = JobOpportunity::findOrFail($id);

        return Inertia::render('administrator/Jobs/Form', [
            'job' => [
                'id' => $job->id,
                'title' => $job->title,
                'description' => $job->description,
                'image_url' => $job->image_path ? '/storage/'.$job->image_path : null,
                'file_url' => $job->file_path ? '/storage/'.$job->file_path : null,
                'published_at' => $job->published_at?->format('Y-m-d\TH:i'),
                'created_at' => $job->created_at->toISOString(),
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'employment_type' => ['required', 'string', 'in:Full-time,Part-time'],
            'image' => ['nullable', 'image', 'max:2048', 'mimes:jpg,jpeg,png'],
            'file' => ['nullable', 'file', 'max:10240', 'mimes:pdf,doc,docx,jpg,jpeg,png'],
            'published_at' => ['nullable', 'date'],
        ]);

        $publishedAt = $request->filled('published_at')
            ? Carbon::parse($request->input('published_at'), config('app.timezone'))
            : now();

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store(self::FILE_DIR, self::FILE_DISK);
        }

        $filePath = null;
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store(self::FILE_DIR, self::FILE_DISK);
        }

        JobOpportunity::create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'employment_type' => $request->input('employment_type'),
            'image_path' => $imagePath,
            'file_path' => $filePath,
            'published_at' => $publishedAt,
        ]);

        return redirect()->route('jobs.manage.index')->with('status', 'Job Opportunity created.');
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'employment_type' => ['required', 'string', 'in:Full-time,Part-time'],
            'image' => ['nullable', 'image', 'max:2048', 'mimes:jpg,jpeg,png'],
            'remove_image' => ['nullable', 'boolean'],
            'file' => ['nullable', 'file', 'max:10240', 'mimes:pdf,doc,docx,jpg,jpeg,png'],
            'remove_file' => ['nullable', 'boolean'],
            'published_at' => ['nullable', 'date'],
        ]);

        $job = JobOpportunity::findOrFail($id);
        $publishedAt = $request->filled('published_at')
            ? Carbon::parse($request->input('published_at'), config('app.timezone'))
            : null;

        $imagePath = $job->image_path;
        if ($request->boolean('remove_image') && $imagePath) {
            Storage::disk(self::FILE_DISK)->delete($imagePath);
            $imagePath = null;
        }

        if ($request->hasFile('image')) {
            if ($job->image_path) {
                Storage::disk(self::FILE_DISK)->delete($job->image_path);
            }
            $imagePath = $request->file('image')->store(self::FILE_DIR, self::FILE_DISK);
        }

        $filePath = $job->file_path;
        if ($request->boolean('remove_file') && $filePath) {
            Storage::disk(self::FILE_DISK)->delete($filePath);
            $filePath = null;
        }

        if ($request->hasFile('file')) {
            if ($job->file_path) {
                Storage::disk(self::FILE_DISK)->delete($job->file_path);
            }
            $filePath = $request->file('file')->store(self::FILE_DIR, self::FILE_DISK);
        }

        $job->update([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'employment_type' => $request->input('employment_type'),
            'image_path' => $imagePath,
            'file_path' => $filePath,
            'published_at' => $publishedAt,
        ]);

        return redirect()->route('jobs.manage.index')->with('status', 'Job Opportunity updated.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $job = JobOpportunity::findOrFail($id);
        if ($job->image_path) {
            Storage::disk(self::FILE_DISK)->delete($job->image_path);
        }
        if ($job->file_path) {
            Storage::disk(self::FILE_DISK)->delete($job->file_path);
        }
        $job->delete();

        return redirect()->back()->with('status', 'Job Opportunity removed.');
    }
}
