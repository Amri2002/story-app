import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, usePage} from '@inertiajs/react';
import {Story, PageProps, PaginatedData} from "@/types";
import FeatureItem from "@/Components/StoryItem";
import StoryItem from '@/Components/StoryItem';
//import {can} from "@/helpers";


export default function Show({story}:{story: Story}) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    <b>{story.name}</b>
                </h2>
            }
        >
            <Head title="{'Story '+ story.name}" />            
            <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8">
            <div className='flex flex-col items-center'>
                <button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-12">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                </svg>
                </button>
                <span className='text-2xl font-semibold'> 
                    12
                </span>
                <button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-12">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>

                </button>
                </div>
                <div className="flex-1">
                    <h2 className='text-2xl mb-2'>{story.name}</h2>
                    {story.photo && (
                    <img
                        src={story.photo}
                        alt={story.name}
                        className="mt-2 max-w-xs h-auto"
                    />
                )}
                    <p>{story.description}</p>
                </div>
                
            </div>
        </div> 
        </AuthenticatedLayout>
    );
}
