import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { PageProps } from "@/types";

type DashboardPageProps = PageProps & {
  recentStories: {
    id: number;
    name: string;
    user: {
      id: number;
      name: string;
    };
    created_at: string;
  }[];
  recentUsers: {
    id: number;
    name: string;
    created_at: string;
  }[];
  storiesCount: number;
  usersCount: number;
  rolesCount: number;
};

interface Story {
  id: number;
  name: string;
  description: string;
  user: {
    id: number;
    name: string;
  };
  created_at: string;
}

interface User {
  id: number;
  name: string;
  created_at: string;
}

export default function Dashboard() {
  const {
    auth,
    recentStories = [],
    recentUsers = [],
    storiesCount = 0,
    usersCount = 0,
    rolesCount = 0,
  } = usePage<DashboardPageProps>().props;

  // For debugging - log props
  useEffect(() => {
    console.log("Dashboard props:", {
      auth,
      recentStories,
      recentUsers,
      storiesCount,
      usersCount,
      rolesCount,
    });
  }, []);

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />
      <div className="p-6 space-y-6">
        {/* Welcome Card */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-lg font-bold mb-2">
            Welcome, {auth?.user?.name || "User"}!
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Here’s what’s happening with your app today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg shadow">
            <div className="text-2xl font-bold">{storiesCount}</div>
            <div className="text-gray-700 dark:text-gray-200">Stories</div>
          </div>
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg shadow">
            <div className="text-2xl font-bold">{usersCount}</div>
            <div className="text-gray-700 dark:text-gray-200">Users</div>
          </div>
          <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg shadow">
            <div className="text-2xl font-bold">{rolesCount}</div>
            <div className="text-gray-700 dark:text-gray-200">Roles</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h4 className="font-semibold mb-2">Quick Actions</h4>
          <div className="flex space-x-4">
            <a
              href="/story/create"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Story
            </a>
            <a
              href="/user"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Manage Users
            </a>
          </div>
        </div>

        {/* Recent Stories */}
        {recentStories.length > 0 && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h4 className="font-semibold mb-2">Recent Stories</h4>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentStories.map((story) => (
                <li key={story.id} className="py-2 flex justify-between">
                  <span>{story.name}</span>
                  <span className="text-sm text-gray-500">
                    by {story.user?.name || "Unknown"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recent Users */}
        {recentUsers.length > 0 && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h4 className="font-semibold mb-2">Recent Users</h4>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentUsers.map((user) => (
                <li key={user.id} className="py-2 flex justify-between">
                  <span>{user.name}</span>
                  <span className="text-sm text-gray-500">
                    Joined {new Date(user.created_at).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* User Roles */}
        {auth?.user?.roles && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h4 className="font-semibold mb-2">Your Role</h4>
            <div className="flex flex-wrap gap-2">
              {auth.user.roles.map((role) => (
                <span
                  key={role}
                  className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 rounded-full text-sm"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
