import React, { useState } from 'react';
import { Story } from '@/types';
import { Link } from '@inertiajs/react'; // Adjust the import based on your routing library
import StoryActionsDropdown from './StoryActionsDropdown';
import StoryUpvoteDownvote from './StoryUpvoteDownvote';

/*interface Props {
    story: Story;
}*/
export default function StoryItem({story}: {story: Story}){

//const StoryItem: React.FC<Props> = ({ story }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-10 text-gray-900 dark:text-gray-100 flex gap-8 ">
               
                <div className="flex-1">
                    <h2 className='text-2xl mb-2'>
                        <Link href={route('story.show', story.id)}>
                            {story.name}
                        </Link>
                    </h2>
                    {story.photo && (
                        <img
                            src={story.photo}
                            alt={story.name}
                            className="mt-2 max-w-xs h-auto"
                        />
                    )}

                    {story.description.length >200 && (
                    <>
                    <p>{isExpanded ? story.description : `${story.description.slice(0, 200)}...`}</p>
                    <button onClick={toggleExpanded} className='text-amber-500 hover:underline'>
                        {isExpanded ? 'Read less' : 'Read more'}
                    </button>
                    </>
                    )}           

                    {story.description.length<=200 && (
                        <p>{story.description}</p>
                    )}
                    <div className="py-4">
                        <StoryUpvoteDownvote story={story} />
                    </div>
                    <div className="py-4">
                        <Link href ={route('story.show', story)}
                            className="inline-flex gap-2 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 
                            focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 
                            focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 
                            dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        Comments
                        </Link>
                    </div>
                </div>
                <div>
                    <StoryActionsDropdown story={story} />
                </div>
            </div>
        </div>
    );
}

//export default StoryItem;