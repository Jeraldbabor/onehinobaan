<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\DownloadableFile;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DownloadableController extends Controller
{
    public function index(): Response
    {
        $files = DownloadableFile::active()
            ->orderByDesc('created_at')
            ->get()
            ->map(fn (DownloadableFile $file) => [
                'id' => $file->id,
                'title' => $file->title,
                'description' => $file->description,
                'office' => $file->office,
                'file_name' => $file->file_name,
                'file_size' => $file->file_size,
                'file_type' => $file->file_type,
                'view_count' => $file->view_count,
                'download_count' => $file->download_count,
                'file_url' => '/storage/' . $file->file_path,
                'created_at' => $file->created_at->toISOString(),
            ]);

        return Inertia::render('downloads/index', [
            'downloadableFiles' => $files,
        ]);
    }

    public function preview($id): Response
    {
        $file = DownloadableFile::active()->findOrFail($id);
        
        // Track view
        $file->increment('view_count');

        return Inertia::render('downloads/preview', [
            'file' => [
                'id' => $file->id,
                'title' => $file->title,
                'description' => $file->description,
                'office' => $file->office,
                'file_name' => $file->file_name,
                'file_size' => $file->file_size,
                'file_type' => $file->file_type,
                'file_url' => '/storage/' . $file->file_path,
                'created_at' => $file->created_at->toISOString(),
            ],
        ]);
    }

    public function download(int $id)
    {
        $file = DownloadableFile::active()->findOrFail($id);
        $file->increment('download_count');

        $path = storage_path('app/public/' . $file->file_path);
        
        return response()->download($path, $file->file_name);
    }

    public function view(int $id)
    {
        $file = DownloadableFile::active()->findOrFail($id);
        $file->increment('view_count');

        return response()->json(['success' => true]);
    }
}
