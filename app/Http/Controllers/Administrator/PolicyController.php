<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Models\SiteContent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PolicyController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('administrator/policies-edit', [
            'privacy' => SiteContent::getByKey(SiteContent::KEY_PRIVACY_POLICY)->content,
            'cookies' => SiteContent::getByKey(SiteContent::KEY_COOKIES_POLICY)->content,
            'accessibility' => SiteContent::getByKey(SiteContent::KEY_ACCESSIBILITY_POLICY)->content,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'privacy' => 'nullable|string',
            'cookies' => 'nullable|string',
            'accessibility' => 'nullable|string',
        ]);

        $privacy = SiteContent::getByKey(SiteContent::KEY_PRIVACY_POLICY);
        $privacy->content = $request->input('privacy', '');
        $privacy->save();

        $cookies = SiteContent::getByKey(SiteContent::KEY_COOKIES_POLICY);
        $cookies->content = $request->input('cookies', '');
        $cookies->save();

        $accessibility = SiteContent::getByKey(SiteContent::KEY_ACCESSIBILITY_POLICY);
        $accessibility->content = $request->input('accessibility', '');
        $accessibility->save();

        return back()->with('status', 'Policies updated successfully.');
    }
}
