import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, usePage} from '@inertiajs/react';
import {Story, PageProps, PaginatedData} from "@/types";
import FeatureItem from "@/Components/StoryItem";
import StoryItem from '@/Components/StoryItem';
//import {can} from "@/helpers";


export default function Index({stories}:{stories: PaginatedData<Story>}) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Stories
                </h2>
            }
        >
            <Head title="Stories" />   
                     <div className='mb-8'>
                        <Link href={route('story.create')} className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300">Create Story</Link>
                     </div>
                    {stories.data.map((story) => (
                        <StoryItem story={story} key={story.id}/>
                    ))}
        </AuthenticatedLayout>
    );
}
