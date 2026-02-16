<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\SiteContent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    /**
     * Fallback map embed URL when none or invalid in DB.
     * Google Maps embed for Hinoba-an, Negros Occidental.
     * Replace via Dashboard → Contact Us or CONTACT_MAP_EMBED_URL in .env for a custom embed.
     */
    private const FALLBACK_MAP_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.55!2d122.467!3d9.6017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMzYnMDYnTiAxMjLCsDI4JzAxIkU!5e0!3m2!1sen!2sph!4v1';

    /**
     * Whether the given URL is safe to embed (Google embed or OSM embed).
     */
    private static function isValidEmbedUrl(string $url): bool
    {
        $url = trim($url);
        if ($url === '') {
            return false;
        }
        if (str_contains($url, 'google.com/maps/embed')) {
            return true;
        }
        if (str_contains($url, 'openstreetmap.org')) {
            return true;
        }

        return false;
    }

    /**
     * Show the public Contact Us page (content and map from database).
     */
    public function show(): Response
    {
        $contact = SiteContent::getContact();
        $mapUrl = trim($contact['map_embed_url'] ?? '');
        if (! self::isValidEmbedUrl($mapUrl)) {
            $envUrl = trim((string) config('services.contact_map_embed_url', ''));
            $contact['map_embed_url'] = self::isValidEmbedUrl($envUrl)
                ? $envUrl
                : self::FALLBACK_MAP_EMBED_URL;
        }

        return Inertia::render('contact', [
            'contact' => $contact,
            'announcements' => Announcement::forSidebar(),
        ]);
    }

    /**
     * Show the admin form to edit contact info and map.
     */
    public function edit(): Response
    {
        $contact = SiteContent::getContact();

        return Inertia::render('administrator/contact-edit', [
            'contact' => $contact,
        ]);
    }

    /**
     * Update contact info and map (admin only).
     */
    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'address' => ['nullable', 'string', 'max:500'],
            'phone' => ['nullable', 'string', 'max:100'],
            'email' => ['nullable', 'email', 'max:255'],
            'facebook_municipality_url' => ['nullable', 'string', 'max:500'],
            'facebook_mayor_url' => ['nullable', 'string', 'max:500'],
            'hotlines' => ['nullable', 'array'],
            'hotlines.*.label' => ['required', 'string', 'max:255'],
            'hotlines.*.number' => ['required', 'string', 'max:255'],
            'map_embed_url' => [
                'nullable',
                'string',
                'max:2000',
                function (string $attribute, ?string $value, \Closure $fail): void {
                    $value = trim($value ?? '');
                    if ($value === '') {
                        return;
                    }
                    if (str_contains($value, 'google.com/maps') && ! str_contains($value, 'google.com/maps/embed')) {
                        $fail('Use the embed URL from Google Maps: go to Share → Embed a map → copy the iframe src (URL must contain /maps/embed). The normal map link cannot be used in the iframe.');
                    }
                },
            ],
        ]);

        SiteContent::setContact([
            'address' => $request->input('address', ''),
            'phone' => $request->input('phone', ''),
            'email' => $request->input('email', ''),
            'map_embed_url' => $request->input('map_embed_url', ''),
            'facebook_municipality_url' => $request->input('facebook_municipality_url', ''),
            'facebook_mayor_url' => $request->input('facebook_mayor_url', ''),
            'hotlines' => $request->input('hotlines', []),
        ]);

        return back()->with('status', 'Contact information updated successfully.');
    }
}
