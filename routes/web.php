web.php
<?php

use App\Http\Controllers\StoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UpvoteController;
use App\Http\Controllers\DashboardController;
use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use Illuminate\Support\Facades\Artisan;

Route::redirect('/', '/dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware(['verified', 'role:' . RolesEnum::Admin->value])->group(function () {
        Route::get('/user', [UserController::class, 'index'])->name('user.index');
        Route::get('/user/{user}/edit', [UserController::class, 'edit'])->name('user.edit');
        Route::patch('/user/{user}', [UserController::class, 'update'])->name('user.update');
    });

    Route::middleware([
        'verified',
        sprintf('role:%s|%s|%s',
            RolesEnum::User->value,
            RolesEnum::Commenter->value,
            RolesEnum::Admin->value
        )
    ])->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])
            ->middleware(['auth', 'verified'])->name('dashboard');

        Route::resource('story', StoryController::class)
            ->except(['index', 'show'])
            ->middleware('can:' . PermissionsEnum::ManageStories->value);

        Route::get('/story', [StoryController::class, 'index'])->name('story.index');
        Route::get('/story/{story}', [StoryController::class, 'show'])->name('story.show');

        Route::post('/story/{story}/upvote', [UpvoteController::class, 'store'])->name('upvote.store');
        Route::delete('/upvote/{story}', [UpvoteController::class, 'destroy'])->name('upvote.destroy');

        Route::post('/story/{story}/comments', [CommentController::class, 'store'])
            ->name('comment.store')
            ->middleware('can:' . PermissionsEnum::ManageComments->value);
        Route::delete('/comment/{comment}', [CommentController::class, 'destroy'])
            ->name('comment.destroy')
            ->middleware('can:' . PermissionsEnum::ManageComments->value);
    });
});



require __DIR__.'/auth.php';
