<?php

use App\Http\Controllers\Administrator\BarangayController;
use App\Http\Controllers\Administrator\HistoryController;
use App\Http\Controllers\Administrator\OfficialsController;
use App\Http\Controllers\Administrator\VisionMissionController;
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

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified', 'admin'])->name('dashboard');

// Admin: Edit history, vision/mission, and officials
Route::middleware(['auth', 'verified', 'admin'])->group(function () {
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
});

require __DIR__.'/settings.php';
