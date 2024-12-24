<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StoryController; // Add this line
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UpvoteController;
use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use App\Http\Controllers\UserController;

Route::redirect('/', '/dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware(['verified', 'role:' .RolesEnum::User->value])->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('Dashboard');
        })->name('dashboard');

        Route::resource('story', StoryController::class)
            ->except(['index','show'])
            ->middleware('can:' .\App\Enum\PermissionsEnum::ManageStories->value);

        Route::get('/story', [StoryController::class, 'index'])
            ->name('story.index');
        
        Route::get('/story/{story}', [StoryController::class, 'show'])
            ->name('story.show');

        Route::post('/story/{story}/upvote',[UpvoteController::class,'store'])
            ->name('upvote.store');
         Route::delete('/upvote/{story}',[UpvoteController::class,'destroy'])
            ->name('upvote.destroy');

        Route::post('/story/{story}/comments',[CommentController::class,'store'])
            ->name('comment.store')
            ->middleware('can:' . PermissionsEnum::ManageComments->value);
        Route::delete('/comment/{comment}',[CommentController::class,'destroy'])
            ->name('comment.destroy')
            ->middleware('can:' .PermissionsEnum::ManageComments->value);
        
        });
    });


require __DIR__.'/auth.php';
