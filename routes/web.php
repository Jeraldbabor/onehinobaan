<?php

use App\Http\Controllers\Administrator\AnnouncementController;
use App\Http\Controllers\Administrator\BarangayController;
use App\Http\Controllers\Administrator\HistoryController;
use App\Http\Controllers\Administrator\OfficialsController;
use App\Http\Controllers\Administrator\TourismController as AdminTourismController;
use App\Http\Controllers\Administrator\VisionMissionController;
use App\Http\Controllers\AnnouncementListController;
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

Route::get('/', function () {
    return Inertia::render('landing', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Public: History page (content from database)
Route::get('about/history', [HistoryController::class, 'show'])->name('history.show');

// Public: Vision & Mission page (content from database)
Route::get('about/vision-mission', [VisionMissionController::class, 'show'])->name('vision-mission.show');

// Public: Key Officials page (images from database)
Route::get('about/officials', [OfficialsController::class, 'show'])->name('officials.show');

// Public: Barangay page (images from database)
Route::get('about/barangay', [BarangayController::class, 'show'])->name('barangay.show');

// Public: News, Updates, Announcements (full list per type)
Route::get('news', [AnnouncementListController::class, 'news'])->name('news.index');
Route::get('news/{id}', [AnnouncementListController::class, 'showNews'])->name('news.show')->whereNumber('id');
Route::get('updates', [AnnouncementListController::class, 'updates'])->name('updates.index');
Route::get('updates/{id}', [AnnouncementListController::class, 'showUpdate'])->name('updates.show')->whereNumber('id');
Route::get('announcements', [AnnouncementListController::class, 'announcements'])->name('announcements.list');
Route::get('announcements/{id}', [AnnouncementListController::class, 'showAnnouncement'])->name('announcements.show')->whereNumber('id');

// Public: Tourism list and item detail (detail route first so {id} is not eaten by {type})
Route::get('tourism/{type}/{id}', [TourismController::class, 'showItem'])
    ->where('type', 'attraction|resorts|festivals')
    ->name('tourism.item');
Route::get('tourism/{type}', [TourismController::class, 'show'])
    ->where('type', 'attraction|resorts|festivals')
    ->name('tourism.show');

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
    Route::post('dashboard/officials', [OfficialsController::class, 'store'])->name('officials.store');
    Route::delete('dashboard/officials/{id}', [OfficialsController::class, 'destroy'])->name('officials.destroy');
    Route::get('dashboard/barangay', [BarangayController::class, 'index'])->name('barangay.index');
    Route::post('dashboard/barangay', [BarangayController::class, 'store'])->name('barangay.store');
    Route::delete('dashboard/barangay/{id}', [BarangayController::class, 'destroy'])->name('barangay.destroy');

    // News & Announcements
    Route::get('dashboard/announcements', [AnnouncementController::class, 'index'])->name('announcements.index');
    Route::get('dashboard/announcements/create', [AnnouncementController::class, 'create'])->name('announcements.create');
    Route::post('dashboard/announcements', [AnnouncementController::class, 'store'])->name('announcements.store');
    Route::get('dashboard/announcements/{id}/edit', [AnnouncementController::class, 'edit'])->name('announcements.edit');
    Route::put('dashboard/announcements/{id}', [AnnouncementController::class, 'update'])->name('announcements.update');
    Route::delete('dashboard/announcements/{id}', [AnnouncementController::class, 'destroy'])->name('announcements.destroy');
});

require __DIR__.'/settings.php';
