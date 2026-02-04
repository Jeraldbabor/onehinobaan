<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Models\SiteContent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class VisionMissionController extends Controller
{
    private const IMAGE_DISK = 'public';

    private const IMAGE_DIR = 'site-content';

    /**
     * Show the public Vision & Mission page (content from database).
     */
    public function show(): Response
    {
        $vision = SiteContent::getByKey(SiteContent::KEY_VISION);
        $mission = SiteContent::getByKey(SiteContent::KEY_MISSION);
        $visionMissionImage = SiteContent::getByKey(SiteContent::KEY_VISION_MISSION_IMAGE);

        return Inertia::render('about/vision-mission', [
            'vision' => [
                'content' => (string) ($vision->content ?? ''),
            ],
            'mission' => [
                'content' => (string) ($mission->content ?? ''),
            ],
            'vision_mission_image_url' => $visionMissionImage->image_path
                ? $visionMissionImage->image_url
                : null,
        ]);
    }

    /**
     * Show the admin form to edit vision and mission content.
     */
    public function edit(): Response
    {
        $vision = SiteContent::getByKey(SiteContent::KEY_VISION);
        $mission = SiteContent::getByKey(SiteContent::KEY_MISSION);
        $visionMissionImage = SiteContent::getByKey(SiteContent::KEY_VISION_MISSION_IMAGE);

        return Inertia::render('administrator/vision-mission-edit', [
            'vision' => [
                'content' => $vision->content ?? '',
            ],
            'mission' => [
                'content' => $mission->content ?? '',
            ],
            'vision_mission_image_url' => $visionMissionImage->image_url,
        ]);
    }

    /**
     * Update vision and mission content (admin only).
     */
    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'vision' => ['nullable', 'string'],
            'mission' => ['nullable', 'string'],
            'vision_mission_image' => ['nullable', 'image', 'max:102400', 'mimes:jpeg,png,gif,webp'],
            'remove_vision_mission_image' => ['nullable', 'boolean'],
        ]);

        $visionContent = SiteContent::getByKey(SiteContent::KEY_VISION);
        $visionContent->content = $request->input('vision', '');
        $visionContent->save();

        $missionContent = SiteContent::getByKey(SiteContent::KEY_MISSION);
        $missionContent->content = $request->input('mission', '');
        $missionContent->save();

        $visionMissionImageRow = SiteContent::getByKey(SiteContent::KEY_VISION_MISSION_IMAGE);
        $this->updateImage($request, $visionMissionImageRow, 'vision_mission_image', 'remove_vision_mission_image');
        $visionMissionImageRow->save();

        return back()->with('status', 'Vision and Mission updated successfully.');
    }

    private function updateImage(Request $request, SiteContent $model, string $fileKey, string $removeKey): void
    {
        if ($request->boolean($removeKey) && $model->image_path) {
            Storage::disk(self::IMAGE_DISK)->delete($model->image_path);
            $model->image_path = null;
            return;
        }

        if ($request->hasFile($fileKey)) {
            if ($model->image_path) {
                Storage::disk(self::IMAGE_DISK)->delete($model->image_path);
            }
            $file = $request->file($fileKey);
            $path = $file->store(self::IMAGE_DIR, self::IMAGE_DISK);
            $model->image_path = $path;
        }
    }
}
