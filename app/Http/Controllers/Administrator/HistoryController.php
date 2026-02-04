<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Models\SiteContent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HistoryController extends Controller
{
    /**
     * Show the public history page (content from database).
     */
    public function show(): Response
    {
        $content = SiteContent::getByKey(SiteContent::KEY_HISTORY);

        return Inertia::render('about/history', [
            'history' => [
                'content' => $content->content ?? '',
            ],
        ]);
    }

    /**
     * Show the admin form to edit history content.
     */
    public function edit(): Response
    {
        $content = SiteContent::getByKey(SiteContent::KEY_HISTORY);

        return Inertia::render('administrator/history-edit', [
            'history' => [
                'content' => $content->content ?? '',
            ],
        ]);
    }

    /**
     * Update history content (admin only).
     */
    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'content' => ['nullable', 'string'],
        ]);

        $content = SiteContent::getByKey(SiteContent::KEY_HISTORY);
        $content->content = $request->input('content', '');
        $content->save();

        return back()->with('status', 'History updated successfully.');
    }
}
