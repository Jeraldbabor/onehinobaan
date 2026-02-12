<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Models\SiteContent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class GeneralSettingsController extends Controller
{
    private const IMAGE_DISK = 'public';

    private const LOGO_DIR = 'logos';

    private const VIDEO_DIR = 'videos';

    /**
     * Show the admin form to edit general settings.
     */
    public function edit(): Response
    {
        $settings = SiteContent::getGeneralSettings();

        return Inertia::render('administrator/general-settings-edit', [
            'settings' => [
                'main_logo_url' => $this->storageUrl($settings['main_logo_path']),
                'bp_logo_url' => $this->storageUrl($settings['bp_logo_path']),
                'one_hinobaan_logo_url' => $this->storageUrl($settings['one_hinobaan_logo_path']),
                'transparency_seal_url' => $this->storageUrl($settings['transparency_seal_path']),
                'landing_video_url' => $this->storageUrl($settings['landing_video_path']),
                'sub_page_banner_url' => $this->storageUrl($settings['sub_page_banner_path']),
            ],
        ]);
    }

    /**
     * Update general settings.
     */
    public function update(Request $request): RedirectResponse
    {
        try {
            $request->validate([
                'main_logo' => ['nullable', 'image', 'max:5120'], // 5MB
                'bp_logo' => ['nullable', 'image', 'max:5120'],
                'one_hinobaan_logo' => ['nullable', 'image', 'max:5120'],
                'transparency_seal' => ['nullable', 'image', 'max:5120'],
                'landing_video' => ['nullable', 'file', 'mimetypes:video/mp4,video/quicktime', 'max:102400'], // Increased to 100MB
                'sub_page_banner' => ['nullable', 'image', 'max:5120'],
            ]);

            $settings = SiteContent::getGeneralSettings();

            if ($request->hasFile('main_logo')) {
                $settings['main_logo_path'] = $this->handleUpload($request->file('main_logo'), $settings['main_logo_path'], self::LOGO_DIR);
            }

            if ($request->hasFile('bp_logo')) {
                $settings['bp_logo_path'] = $this->handleUpload($request->file('bp_logo'), $settings['bp_logo_path'], self::LOGO_DIR);
            }

            if ($request->hasFile('one_hinobaan_logo')) {
                $settings['one_hinobaan_logo_path'] = $this->handleUpload($request->file('one_hinobaan_logo'), $settings['one_hinobaan_logo_path'], self::LOGO_DIR);
            }

            if ($request->hasFile('transparency_seal')) {
                $settings['transparency_seal_path'] = $this->handleUpload($request->file('transparency_seal'), $settings['transparency_seal_path'], self::LOGO_DIR);
            }

            if ($request->hasFile('landing_video')) {
                $settings['landing_video_path'] = $this->handleUpload($request->file('landing_video'), $settings['landing_video_path'], self::VIDEO_DIR);
            }

            if ($request->hasFile('sub_page_banner')) {
                $settings['sub_page_banner_path'] = $this->handleUpload($request->file('sub_page_banner'), $settings['sub_page_banner_path'], self::LOGO_DIR);
            }

            SiteContent::setGeneralSettings($settings);

            return back()->with('status', 'General settings updated successfully.');
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('General settings update failed: ' . $e->getMessage());
            return back()->withErrors(['general_settings' => 'An error occurred while updating settings: ' . $e->getMessage()]);
        }
    }

    private function handleUpload($file, $oldPath, $dir): string
    {
        // Don't delete default assets if they are in the public/hinobaan-logo or public/hinobaan-videos
        // Only delete if they are in the dynamic storage directories
        if ($oldPath && ! str_starts_with($oldPath, 'hinobaan-')) {
            Storage::disk(self::IMAGE_DISK)->delete($oldPath);
        }

        return $file->store($dir, self::IMAGE_DISK);
    }

    private function storageUrl($path): string
    {
        if (! $path) {
            return '';
        }

        // If it starts with hinobaan-, it's likely a public asset
        if (str_starts_with($path, 'hinobaan-')) {
            return '/'.$path;
        }

        // Fix: Force relative URL for local public disk to avoid double-URL issues if APP_URL is misconfigured
        if (self::IMAGE_DISK === 'public') {
            return '/storage/' . $path;
        }

        return Storage::disk(self::IMAGE_DISK)->url($path);
    }
}
