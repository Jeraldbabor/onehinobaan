<?php

use App\Http\Controllers\ActivityListController;
use App\Http\Controllers\Administrator\ActivityController as AdminActivityController;
use App\Http\Controllers\Administrator\AnnouncementController;
use App\Http\Controllers\Administrator\BarangayController;
use App\Http\Controllers\Administrator\ContactController;
use App\Http\Controllers\Administrator\GeneralSettingsController;
use App\Http\Controllers\Administrator\HistoryController;
use App\Http\Controllers\Administrator\OfficialsController;
use App\Http\Controllers\Administrator\PolicyController as AdminPolicyController;
use App\Http\Controllers\Administrator\TourismController as AdminTourismController;
use App\Http\Controllers\Administrator\VisionMissionController;
use App\Http\Controllers\AnnouncementListController;
use App\Http\Controllers\PolicyController;
use App\Http\Controllers\TourismController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/portal-admin-1x6114', function (Request $request) {
    return Inertia::render('auth/login', [
        'canResetPassword' => Features::enabled(Features::resetPasswords()),
        'canRegister' => Features::enabled(Features::registration()),
        'status' => $request->session()->get('status'),
    ]);
})->name('login.portal')->middleware(['web', 'guest']);

Route::get('/search', [App\Http\Controllers\SearchController::class, 'index'])->name('search');

Route::get('/', function () {
    $officials = app(OfficialsController::class)->getOfficialsForFrontend();
    $activities = \App\Models\Activity::published()
        ->orderByRaw('COALESCE(published_at, created_at) DESC')
        ->take(3)
        ->get()
        ->map(fn (\App\Models\Activity $a) => [
            'id' => $a->id,
            'title' => $a->title,
            'content' => $a->content,
            'link_url' => $a->link_url,
            'image_url' => $a->image_path ? '/storage/'.$a->image_path : null,
            'published_at' => $a->published_at?->toISOString(),
        ])
        ->values()
        ->all();
    $contact = \App\Models\SiteContent::getContact();

    // Fetch 3 of each tourism type
    $tourismAttractions = \App\Models\TourismItem::ofType('attraction')->with('images')->take(3)->get()->map(fn ($item) => [
        'id' => $item->id,
        'title' => $item->title,
        'description' => $item->description,
        'address' => $item->address,
        'image_url' => $item->image_url,
        'image_urls' => $item->images->map(fn ($img) => $img->image_url)->values()->all(),
    ]);
    $tourismResorts = \App\Models\TourismItem::ofType('resort')->with('images')->take(3)->get()->map(fn ($item) => [
        'id' => $item->id,
        'title' => $item->title,
        'description' => $item->description,
        'address' => $item->address,
        'image_url' => $item->image_url,
        'image_urls' => $item->images->map(fn ($img) => $img->image_url)->values()->all(),
    ]);
    $tourismFestivals = \App\Models\TourismItem::ofType('festival')->with('images')->take(3)->get()->map(fn ($item) => [
        'id' => $item->id,
        'title' => $item->title,
        'description' => $item->description,
        'address' => $item->address,
        'image_url' => $item->image_url,
        'image_urls' => $item->images->map(fn ($img) => $img->image_url)->values()->all(),
    ]);

    $projects = \App\Models\Project::published()
        ->orderByRaw('COALESCE(published_at, created_at) DESC')
        ->take(3)
        ->get()
        ->map(fn (\App\Models\Project $p) => [
            'id' => $p->id,
            'title' => $p->title,
            'description' => $p->description,
            'status' => $p->status,
            'link_url' => $p->link_url,
            'image_url' => $p->image_path ? '/storage/'.$p->image_path : null,
            'video_url' => $p->video_path ? '/storage/'.$p->video_path : null,
            'published_at' => $p->published_at?->toISOString(),
        ]);

    return Inertia::render('landing', [
        'canRegister' => Features::enabled(Features::registration()),
        'mayor' => $officials['mayor'],
        'viceMayor' => $officials['vice_mayor'],
        'sbMembers' => $officials['sb_members'],
        'activities' => $activities,
        'projects' => $projects,
        'announcements' => \App\Models\Announcement::forSidebar(),
        'facebookMunicipalityUrl' => $contact['facebook_municipality_url'] ?? '',
        'facebookMayorUrl' => $contact['facebook_mayor_url'] ?? '',
        'tourismAttractions' => $tourismAttractions,
        'tourismResorts' => $tourismResorts,
        'tourismFestivals' => $tourismFestivals,
    ]);
})->name('home');

// Public: History page (content from database)
Route::get('about/history', [HistoryController::class, 'show'])->name('history.show');

// Public: Vision & Mission page (content from database)
Route::get('about/vision-mission', [VisionMissionController::class, 'show'])->name('vision-mission.show');

// Public: Key Officials page (optional section: mayor, vice-mayor, sb-member)
Route::get('about/officials/{section?}', [OfficialsController::class, 'show'])
    ->where('section', 'mayor|vice-mayor|sb-member')
    ->name('officials.show');

// Public: Barangay page (images from database)
Route::get('about/barangay', [BarangayController::class, 'show'])->name('barangay.show');
Route::get('about/barangay/{id}', [BarangayController::class, 'showDetail'])->name('barangay.detail');

// Public: Contact Us (address, phone, email, map from database)
Route::get('contact', [ContactController::class, 'show'])->name('contact.show');

// Public: News, Updates, Announcements (full list per type)
Route::get('news', [AnnouncementListController::class, 'news'])->name('news.index');
Route::get('news/{id}', [AnnouncementListController::class, 'showNews'])->name('news.show')->whereNumber('id');
Route::get('updates', [AnnouncementListController::class, 'updates'])->name('updates.index');
Route::get('updates/{id}', [AnnouncementListController::class, 'showUpdate'])->name('updates.show')->whereNumber('id');
Route::get('announcements', [AnnouncementListController::class, 'announcements'])->name('announcements.list');
Route::get('announcements/{id}', [AnnouncementListController::class, 'showAnnouncement'])->name('announcements.show')->whereNumber('id');
Route::get('activities', [ActivityListController::class, 'index'])->name('activities.index');
Route::get('activities/{id}', [ActivityListController::class, 'show'])->name('activities.show')->whereNumber('id');
Route::get('projects/{id}', [App\Http\Controllers\ProjectController::class, 'show'])->name('projects.show')->whereNumber('id');
Route::get('jobs', [App\Http\Controllers\JobOpportunityController::class, 'index'])->name('jobs.index');
Route::get('jobs/{id}', [App\Http\Controllers\JobOpportunityController::class, 'show'])->name('jobs.show')->whereNumber('id');

// Public: Tourism list and item detail (detail route first so {id} is not eaten by {type})
Route::get('tourism/{type}/{id}', [TourismController::class, 'showItem'])
    ->where('type', 'attraction|resorts|festivals')
    ->name('tourism.item');
Route::get('tourism/{type}', [TourismController::class, 'show'])
    ->where('type', 'attraction|resorts|festivals')
    ->name('tourism.show');

// Transparency
Route::get('transparency/full-disclosure', function () {
    return Inertia::render('Transparency/FullDisclosure');
})->name('transparency.full-disclosure');

Route::get('transparency/citizens-charter', function () {
    return Inertia::render('Transparency/CitizensCharter');
})->name('transparency.citizens-charter');

// Policies
Route::get('privacy', [PolicyController::class, 'privacy'])->name('privacy');
Route::get('accessibility', [PolicyController::class, 'accessibility'])->name('accessibility');
Route::get('cookies', [PolicyController::class, 'cookies'])->name('cookies');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified', 'admin'])->name('dashboard');

// Admin: Edit history, vision/mission, officials, barangay, tourism
Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('dashboard/tourism/attraction', [AdminTourismController::class, 'index'])->name('tourism.attraction.edit');
    Route::post('dashboard/tourism/attraction', [AdminTourismController::class, 'store'])->name('tourism.attraction.store');
    Route::put('dashboard/tourism/attraction/{id}', [AdminTourismController::class, 'update'])->name('tourism.attraction.update');
    Route::delete('dashboard/tourism/attraction/images/{imageId}', [AdminTourismController::class, 'destroyImage'])->name('tourism.attraction.destroyImage');
    Route::delete('dashboard/tourism/attraction/{id}', [AdminTourismController::class, 'destroy'])->name('tourism.attraction.destroy');
    Route::get('dashboard/tourism/resorts', [AdminTourismController::class, 'index'])->name('tourism.resorts.edit');
    Route::post('dashboard/tourism/resorts', [AdminTourismController::class, 'store'])->name('tourism.resorts.store');
    Route::put('dashboard/tourism/resorts/{id}', [AdminTourismController::class, 'update'])->name('tourism.resorts.update');
    Route::delete('dashboard/tourism/resorts/images/{imageId}', [AdminTourismController::class, 'destroyImage'])->name('tourism.resorts.destroyImage');
    Route::delete('dashboard/tourism/resorts/{id}', [AdminTourismController::class, 'destroy'])->name('tourism.resorts.destroy');
    Route::get('dashboard/tourism/festivals', [AdminTourismController::class, 'index'])->name('tourism.festivals.edit');
    Route::post('dashboard/tourism/festivals', [AdminTourismController::class, 'store'])->name('tourism.festivals.store');
    Route::put('dashboard/tourism/festivals/{id}', [AdminTourismController::class, 'update'])->name('tourism.festivals.update');
    Route::delete('dashboard/tourism/festivals/images/{imageId}', [AdminTourismController::class, 'destroyImage'])->name('tourism.festivals.destroyImage');
    Route::delete('dashboard/tourism/festivals/{id}', [AdminTourismController::class, 'destroy'])->name('tourism.festivals.destroy');

    // History, Vision/Mission, Officials, Barangay
    Route::get('dashboard/history', [HistoryController::class, 'edit'])->name('history.edit');
    Route::put('dashboard/history', [HistoryController::class, 'update'])->name('history.update');
    Route::get('dashboard/vision-mission', [VisionMissionController::class, 'edit'])->name('vision-mission.edit');
    Route::put('dashboard/vision-mission', [VisionMissionController::class, 'update'])->name('vision-mission.update');
    Route::get('dashboard/officials', [OfficialsController::class, 'index'])->name('officials.index');
    Route::put('dashboard/officials/mayor', [OfficialsController::class, 'updateMayor'])->name('officials.updateMayor');
    Route::put('dashboard/officials/vice-mayor', [OfficialsController::class, 'updateViceMayor'])->name('officials.updateViceMayor');
    Route::post('dashboard/officials/sb-members', [OfficialsController::class, 'storeSbMember'])->name('officials.storeSbMember');
    Route::put('dashboard/officials/sb-members/{id}', [OfficialsController::class, 'updateSbMember'])->name('officials.updateSbMember');
    Route::delete('dashboard/officials/sb-members/{id}', [OfficialsController::class, 'destroySbMember'])->name('officials.destroySbMember');
    // Barangay Routes
    Route::get('dashboard/barangay', [BarangayController::class, 'index'])->name('barangay.index');
    Route::post('dashboard/barangay', [BarangayController::class, 'store'])->name('barangay.store');
    Route::put('dashboard/barangay/{id}', [BarangayController::class, 'update'])->name('barangay.update');
    Route::delete('dashboard/barangay/{id}', [BarangayController::class, 'destroy'])->name('barangay.destroy');

    // Barangay Officials Routes
    Route::post('dashboard/barangay/{id}/officials', [BarangayController::class, 'storeOfficial'])->name('barangay.officials.store');
    Route::delete('dashboard/barangay/officials/{id}', [BarangayController::class, 'destroyOfficial'])->name('barangay.officials.destroy');
    Route::get('dashboard/contact', [ContactController::class, 'edit'])->name('contact.edit');
    Route::put('dashboard/contact', [ContactController::class, 'update'])->name('contact.update');
    Route::get('dashboard/general-settings', [GeneralSettingsController::class, 'edit'])->name('general-settings.edit');
    Route::post('dashboard/general-settings', [GeneralSettingsController::class, 'update'])->name('general-settings.update');

    Route::get('dashboard/policies', [AdminPolicyController::class, 'edit'])->name('policies.edit');
    Route::post('dashboard/policies', [AdminPolicyController::class, 'update'])->name('policies.update');

    // News & Announcements
    Route::get('dashboard/announcements', [AnnouncementController::class, 'index'])->name('announcements.index');
    Route::get('dashboard/announcements/create', [AnnouncementController::class, 'create'])->name('announcements.create');
    Route::post('dashboard/announcements', [AnnouncementController::class, 'store'])->name('announcements.store');
    Route::get('dashboard/announcements/{id}/edit', [AnnouncementController::class, 'edit'])->name('announcements.edit');
    Route::put('dashboard/announcements/{id}', [AnnouncementController::class, 'update'])->name('announcements.update');
    Route::delete('dashboard/announcements/{id}', [AnnouncementController::class, 'destroy'])->name('announcements.destroy');

    // Municipality Activities (separate from News & Announcements)
    Route::get('dashboard/activities', [AdminActivityController::class, 'index'])->name('activities.manage.index');
    Route::get('dashboard/activities/create', [AdminActivityController::class, 'create'])->name('activities.manage.create');
    Route::post('dashboard/activities', [AdminActivityController::class, 'store'])->name('activities.manage.store');
    Route::get('dashboard/activities/{id}/edit', [AdminActivityController::class, 'edit'])->name('activities.manage.edit');
    Route::put('dashboard/activities/{id}', [AdminActivityController::class, 'update'])->name('activities.manage.update');
    Route::delete('dashboard/activities/{id}', [AdminActivityController::class, 'destroy'])->name('activities.manage.destroy');

    // Municipal Projects
    Route::get('dashboard/projects', [\App\Http\Controllers\Administrator\ProjectController::class, 'index'])->name('projects.manage.index');
    Route::get('dashboard/projects/create', [\App\Http\Controllers\Administrator\ProjectController::class, 'create'])->name('projects.manage.create');
    Route::post('dashboard/projects', [\App\Http\Controllers\Administrator\ProjectController::class, 'store'])->name('projects.manage.store');
    Route::get('dashboard/projects/{id}/edit', [\App\Http\Controllers\Administrator\ProjectController::class, 'edit'])->name('projects.manage.edit');
    Route::put('dashboard/projects/{id}', [\App\Http\Controllers\Administrator\ProjectController::class, 'update'])->name('projects.manage.update');
    Route::delete('dashboard/projects/{id}', [\App\Http\Controllers\Administrator\ProjectController::class, 'destroy'])->name('projects.manage.destroy');

    // Job Opportunities
    Route::get('dashboard/jobs', [\App\Http\Controllers\Administrator\JobOpportunityController::class, 'index'])->name('jobs.manage.index');
    Route::get('dashboard/jobs/create', [\App\Http\Controllers\Administrator\JobOpportunityController::class, 'create'])->name('jobs.manage.create');
    Route::post('dashboard/jobs', [\App\Http\Controllers\Administrator\JobOpportunityController::class, 'store'])->name('jobs.manage.store');
    Route::get('dashboard/jobs/{id}/edit', [\App\Http\Controllers\Administrator\JobOpportunityController::class, 'edit'])->name('jobs.manage.edit');
    Route::put('dashboard/jobs/{id}', [\App\Http\Controllers\Administrator\JobOpportunityController::class, 'update'])->name('jobs.manage.update');
    Route::delete('dashboard/jobs/{id}', [\App\Http\Controllers\Administrator\JobOpportunityController::class, 'destroy'])->name('jobs.manage.destroy');

    // User Management (Super Admin only)
    Route::middleware(['super-admin'])->group(function () {
        Route::get('dashboard/users', [\App\Http\Controllers\Administrator\UserController::class, 'index'])->name('users.index');
        Route::post('dashboard/users', [\App\Http\Controllers\Administrator\UserController::class, 'store'])->name('users.store');
        Route::put('dashboard/users/{id}', [\App\Http\Controllers\Administrator\UserController::class, 'update'])->name('users.update');
        Route::delete('dashboard/users/{id}', [\App\Http\Controllers\Administrator\UserController::class, 'destroy'])->name('users.destroy');
        Route::post('dashboard/users/{id}/reset-password', [\App\Http\Controllers\Administrator\UserController::class, 'resetPassword'])->name('users.reset-password');
    });
});

require __DIR__.'/settings.php';
