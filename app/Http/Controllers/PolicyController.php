<?php

namespace App\Http\Controllers;

use App\Models\SiteContent;
use Inertia\Inertia;
use Inertia\Response;

class PolicyController extends Controller
{
    public function privacy(): Response
    {
        $content = SiteContent::getByKey(SiteContent::KEY_PRIVACY_POLICY)->content;

        return Inertia::render('Policies/Show', [
            'title' => 'Privacy Policy',
            'content' => $content ?: 'Privacy policy content coming soon...',
        ]);
    }

    public function accessibility(): Response
    {
        $content = SiteContent::getByKey(SiteContent::KEY_ACCESSIBILITY_POLICY)->content;

        return Inertia::render('Policies/Show', [
            'title' => 'Accessibility Statement',
            'content' => $content ?: 'Accessibility statement content coming soon...',
        ]);
    }

    public function cookies(): Response
    {
        $content = SiteContent::getByKey(SiteContent::KEY_COOKIES_POLICY)->content;

        return Inertia::render('Policies/Show', [
            'title' => 'Cookie Policy',
            'content' => $content ?: 'Cookie policy content coming soon...',
        ]);
    }
}
