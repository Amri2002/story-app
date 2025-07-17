<?php

namespace App\Http\Controllers;

use App\Models\Story;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;
use App\Http\Resources\StoryResource;
use App\Http\Resources\UserResource;

class DashboardController extends Controller
{
    public function index()
    {
        // Fetch recent stories with author info
        $recentStories = Story::latest()
            ->with('user:id,name') // Eager load author
            ->take(5)
            ->get();

        // Fetch recent users
        $recentUsers = User::latest()
            ->take(5)
            ->get();

        return Inertia::render('Dashboard', [
            'recentStories' => StoryResource::collection($recentStories)->resolve(), // <-- Use Resource
            'recentUsers' => UserResource::collection($recentUsers)->resolve(),      // <-- Use Resource
            'storiesCount' => Story::count(),
            'usersCount' => User::count(),
            'rolesCount' => Role::count(),
            'auth' => [
                'user' => auth()->user() ? [
                    'name' => auth()->user()->name,
                    'roles' => auth()->user()->getRoleNames()->toArray(),
                ] : null,
            ],
        ]);
    }
}