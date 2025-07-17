import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import {
  Users,
  BookOpen,
  Shield,
  Plus,
  Settings,
  TrendingUp,
  Clock,
  Calendar,
  ChevronRight,
  Activity,
  Star,
  UserPlus,
} from "lucide-react";
import React from "react";
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

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getTimeAgo = (dateString: string) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  }
};

export default function Dashboard() {
  const {
    auth,
    recentStories = [],
    recentUsers = [],
    storiesCount = 0,
    usersCount = 0,
    rolesCount = 0,
  } = usePage<DashboardPageProps>().props;

  return (
    <AuthenticatedLayout
      header={<h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>}
    >
      <Head title="Dashboard" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">
                Welcome back, {auth?.user?.name || "User"}!
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                {auth?.user?.roles?.map((role: string) => (
                  <span
                    key={role}
                    className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium shadow-sm"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">
                    Total Stories
                  </p>
                  <p className="text-3xl font-bold mt-1">
                    {storiesCount.toLocaleString()}
                  </p>
                  <div className="flex items-center mt-2 text-blue-100">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {/* <span className="text-sm">+12% this month</span> */}
                  </div>
                </div>
                <div className="bg-white bg-opacity-20 p-3 rounded-xl">
                  <BookOpen className="w-8 h-8" />
                </div>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">
                    Active Users
                  </p>
                  <p className="text-3xl font-bold mt-1">
                    {usersCount.toLocaleString()}
                  </p>
                  <div className="flex items-center mt-2 text-emerald-100">
                    <Activity className="w-4 h-4 mr-1" />
                    {/* <span className="text-sm">+8% this month</span> */}
                  </div>
                </div>
                <div className="bg-white bg-opacity-20 p-3 rounded-xl">
                  <Users className="w-8 h-8" />
                </div>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">
                    User Roles
                  </p>
                  <p className="text-3xl font-bold mt-1">{rolesCount}</p>
                  <div className="flex items-center mt-2 text-purple-100">
                    <Shield className="w-4 h-4 mr-1" />
                    <span className="text-sm">System roles</span>
                  </div>
                </div>
                <div className="bg-white bg-opacity-20 p-3 rounded-xl">
                  <Shield className="w-8 h-8" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          {auth?.user?.roles?.includes("admin") && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Quick Actions
                </h3>
                <Settings className="w-5 h-5 text-gray-400" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <a
                  href="/story/create"
                  className="group flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-300 hover:scale-105"
                >
                  <div className="bg-blue-500 p-2 rounded-lg mr-3 group-hover:bg-blue-600 transition-colors">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Add Story</p>
                    <p className="text-sm text-gray-600">Create new content</p>
                  </div>
                </a>

                <a
                  href="/user"
                  className="group flex items-center p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl hover:from-emerald-100 hover:to-emerald-200 transition-all duration-300 hover:scale-105"
                >
                  <div className="bg-emerald-500 p-2 rounded-lg mr-3 group-hover:bg-emerald-600 transition-colors">
                    <UserPlus className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Manage Users</p>
                    <p className="text-sm text-gray-600">User administration</p>
                  </div>
                </a>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Stories */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <BookOpen className="w-6 h-6 text-blue-500 mr-2" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Recent Stories
                  </h3>
                </div>
                <a
                  href="/story"
                  className="text-blue-500 hover:text-blue-600 font-medium text-sm flex items-center"
                >
                  View all <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
              <div className="space-y-4">
                {recentStories.map((story) => (
                  <div
                    key={story.id}
                    className="group p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {story.name}
                        </h4>
                        <div className="flex items-center mt-2 text-sm text-gray-600">
                          <span>by {story.user?.name || "Unknown"}</span>
                          <span className="mx-2">•</span>
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{getTimeAgo(story.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Users */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Users className="w-6 h-6 text-emerald-500 mr-2" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Recent Users
                  </h3>
                </div>
                {auth?.user?.roles?.includes("admin") && (
                  <a
                    href="/user"
                    className="text-emerald-500 hover:text-emerald-600 font-medium text-sm flex items-center"
                  >
                    View all <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                )}
              </div>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="group p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-3">
                          <p className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                            {user.name}
                          </p>
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>Joined {formatDate(user.created_at)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
