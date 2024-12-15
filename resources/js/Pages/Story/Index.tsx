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
            <Head title="Dashboard" />            
                    {stories.data.map((story) => (
                        <StoryItem story={story}/>
                    ))}
        </AuthenticatedLayout>
    );
}
