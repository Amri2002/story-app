import React from 'react';
import { Story, Comment } from '@/types';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StoryUpvoteDownvote from '@/Components/StoryUpvoteDownvote';
import NewCommentForm from '@/Components/NewCommentForm';
import CommentItem from '@/Components/CommentItem';

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
                    <div className="py-4">
                        <StoryUpvoteDownvote story={story} />
                    </div>
                <div className="mt-8">
                    <NewCommentForm story ={story}/>
                    {story.comments.map(comment =>(
                        <CommentItem comment={comment} key={comment.id} />
                    ))}
                </div>
                </div>
            </div>
        </div> 
        </AuthenticatedLayout>
    );
}
