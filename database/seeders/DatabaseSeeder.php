<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Story; // Add this line
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Enum\RolesEnum;
use App\Enum\PermissionsEnum;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $userRole = Role::create(['name' => RolesEnum::User->value]);
        $adminRole = Role::create(['name' => RolesEnum::Admin->value]);
        $commenterRole = Role::create(['name' => RolesEnum::Commenter->value]);

        $manageStoriesPermission = Permission::create([
            'name' => PermissionsEnum::ManageStories->value,
        ]);
        $manageUsersPermission = Permission::create([
            'name' => PermissionsEnum::ManageUsers->value,
        ]);
        $manageCommentsPermission = Permission::create([
            'name' => PermissionsEnum::ManageComments->value,
        ]);
        $upvoteDownvotePermission = Permission::create([
            'name' => PermissionsEnum::UpvoteDownvote->value,
        ]);

        $userRole->syncPermissions([
            $upvoteDownvotePermission,
        ]);
        $commenterRole->syncPermissions([
            $upvoteDownvotePermission,
            $manageCommentsPermission
        ]);
        $adminRole->syncPermissions([
            $manageStoriesPermission,
            $manageUsersPermission,
            $manageCommentsPermission,
            $upvoteDownvotePermission,
        ]);

        User::factory()->create([
            'name' => 'User User',
            'email' => 'user@example.com',
        ])->assignRole(RolesEnum::User);

        User::factory()->create([
            'name' => 'Commenter User',
            'email' => 'commenter@example.com',
        ])->assignRole(RolesEnum::Commenter);

        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ])->assignRole(RolesEnum::Admin);

        Story::factory(10)->create();
    }
}
