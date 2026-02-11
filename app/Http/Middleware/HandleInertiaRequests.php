<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'generalSettings' => function () {
                $settings = \App\Models\SiteContent::getGeneralSettings();
                return [
                    'main_logo_url' => $settings['main_logo_path'] ? (str_starts_with($settings['main_logo_path'], 'hinobaan-') ? '/' . $settings['main_logo_path'] : \Illuminate\Support\Facades\Storage::disk('public')->url($settings['main_logo_path'])) : '',
                    'bp_logo_url' => $settings['bp_logo_path'] ? (str_starts_with($settings['bp_logo_path'], 'hinobaan-') ? '/' . $settings['bp_logo_path'] : \Illuminate\Support\Facades\Storage::disk('public')->url($settings['bp_logo_path'])) : '',
                    'one_hinobaan_logo_url' => $settings['one_hinobaan_logo_path'] ? (str_starts_with($settings['one_hinobaan_logo_path'], 'hinobaan-') ? '/' . $settings['one_hinobaan_logo_path'] : \Illuminate\Support\Facades\Storage::disk('public')->url($settings['one_hinobaan_logo_path'])) : '',
                    'transparency_seal_url' => $settings['transparency_seal_path'] ? (str_starts_with($settings['transparency_seal_path'], 'hinobaan-') ? '/' . $settings['transparency_seal_path'] : \Illuminate\Support\Facades\Storage::disk('public')->url($settings['transparency_seal_path'])) : '',
                    'landing_video_url' => $settings['landing_video_path'] ? (str_starts_with($settings['landing_video_path'], 'hinobaan-') ? '/' . $settings['landing_video_path'] : \Illuminate\Support\Facades\Storage::disk('public')->url($settings['landing_video_path'])) : '',
                    'sub_page_banner_url' => $settings['sub_page_banner_path'] ? (str_starts_with($settings['sub_page_banner_path'], 'hinobaan-') ? '/' . $settings['sub_page_banner_path'] : \Illuminate\Support\Facades\Storage::disk('public')->url($settings['sub_page_banner_path'])) : '',
                ];
            },
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
