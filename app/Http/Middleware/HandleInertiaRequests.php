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
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'role' => $request->user()->role,
                    'avatar_url' => $request->user()->avatarUrl(),
                    'email_verified_at' => $request->user()->email_verified_at,
                    'created_at' => $request->user()->created_at,
                ] : null,
            ],
            'generalSettings' => function () {
                $settings = \App\Models\SiteContent::getGeneralSettings();

                return [
                    'main_logo_url' => $this->getStorageUrl($settings['main_logo_path']),
                    'bp_logo_url' => $this->getStorageUrl($settings['bp_logo_path']),
                    'one_hinobaan_logo_url' => $this->getStorageUrl($settings['one_hinobaan_logo_path']),
                    'transparency_seal_url' => $this->getStorageUrl($settings['transparency_seal_path']),
                    'landing_video_url' => $this->getStorageUrl($settings['landing_video_path']),
                    'sub_page_banner_url' => $this->getStorageUrl($settings['sub_page_banner_path']),
                    'full_disclosure_banner_url' => $this->getStorageUrl($settings['full_disclosure_banner_path']),
                    'full_disclosure_url' => $settings['full_disclosure_url'] ?? 'https://fulldisclosure.dilg.gov.ph/',
                    'citizens_charter_url' => $this->getStorageUrl($settings['citizens_charter_path']),
                ];
            },
            'contact' => function () {
                return \App\Models\SiteContent::getContact();
            },
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }

    private function getStorageUrl(?string $path): string
    {
        if (! $path) {
            return '';
        }

        if (str_starts_with($path, 'hinobaan-')) {
            return '/'.$path;
        }

        return '/storage/'.$path;
    }
}
