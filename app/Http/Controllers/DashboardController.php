<?php

namespace App\Http\Controllers;

use App\Models\Story;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;

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
            'recentStories' => $recentStories,
            'recentUsers' => $recentUsers,
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