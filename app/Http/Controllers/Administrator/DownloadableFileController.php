<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Models\DownloadableFile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class DownloadableFileController extends Controller
{
    private const FILE_DISK = 'public';
    private const FILE_DIR = 'downloadables';

    public function index(): Response
    {
        $files = DownloadableFile::orderByDesc('created_at')
            ->get()
            ->map(fn (DownloadableFile $file) => [
                'id' => $file->id,
                'title' => $file->title,
                'description' => $file->description,
                'office' => $file->office,
                'file_name' => $file->file_name,
                'file_size' => $file->file_size,
                'file_type' => $file->file_type,
                'is_active' => $file->is_active,
                'file_url' => '/storage/' . $file->file_path,
                'created_at' => $file->created_at->toISOString(),
            ]);

        return Inertia::render('administrator/downloadable-files/index', [
            'downloadableFiles' => $files,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'office' => ['nullable', 'string', 'max:255'],
            'file' => ['required', 'file', 'mimetypes:application/pdf', 'max:51200'], // max 50MB, PDF only
            'is_active' => ['boolean'],
        ]);

        $file = $request->file('file');
        
        $path = $file->store(self::FILE_DIR, self::FILE_DISK);

        DownloadableFile::create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'office' => $request->input('office'),
            'file_path' => $path,
            'file_name' => $file->getClientOriginalName(),
            'file_size' => $file->getSize(),
            'file_type' => $file->getClientMimeType(),
            'is_active' => $request->boolean('is_active', true),
        ]);

        return redirect()->back()->with('status', 'File uploaded successfully.');
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'office' => ['nullable', 'string', 'max:255'],
            'is_active' => ['boolean'],
        ]);

        $downloadableFile = DownloadableFile::findOrFail($id);
        
        $downloadableFile->update([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'office' => $request->input('office'),
            'is_active' => $request->boolean('is_active', true),
        ]);

        return redirect()->back()->with('status', 'File updated successfully.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $downloadableFile = DownloadableFile::findOrFail($id);
        
        if ($downloadableFile->file_path) {
            Storage::disk(self::FILE_DISK)->delete($downloadableFile->file_path);
        }
        
        $downloadableFile->delete();

        return redirect()->back()->with('status', 'File removed successfully.');
    }
}
