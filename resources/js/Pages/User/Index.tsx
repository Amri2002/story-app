import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import {User, PageProps, PaginatedData} from "@/types";
import UserItem from '@/Components/UserItem';
import {can} from "@/helpers";


export default function Index({auth, users}: PageProps<{users: User[] }>){

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Users
                </h2>
            }
        >
            <Head title="Users" />                 
<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Email
                </th>
                <th scope="col" class="px-6 py-3">
                    Created At
                </th>
                <th scope="col" class="px-6 py-3">
                    Roles
                </th>
                <th scope="col" class="px-6 py-3">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            {users.map(user =>(<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {user.name}
                </th>
                <td class="px-6 py-4">
                    {user.email}
                </td>
                <td class="px-6 py-4">
                    {user.created_at}
                </td>
                <td class="px-6 py-4">
                    {user.roles.join(', ')}
                </td>
                <td class="px-6 py-4">
                    <Link href={route('user.edit', user.id)} class="text-indigo-600 hover:text-indigo-900">
                    Edit
                    </Link>
                </td>
            </tr>))}
        </tbody>
    </table>
</div>
        </AuthenticatedLayout>
    );
}