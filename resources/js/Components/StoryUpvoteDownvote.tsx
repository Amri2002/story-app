import { Story } from "@/types";
import { useForm } from "@inertiajs/react";

export default function StoryUpvoteDownvote({story}:{story: Story}){
    const upvoteForm = useForm({
        upvote: true
    });

    const downvoteForm = useForm({
        upvote: false
    });

    const upvoteDownvote = (upvote:boolean) => {
        if (story.user_has_upvoted && upvote || story.user_has_downvoted && !upvote) {
            upvoteForm.delete(route('upvote.destroy',story.id),{
                preserveScroll: true
            });
        }else{
            let form = null;
            if(upvote){
                form = upvoteForm;
            }else{
                form = downvoteForm;
            }
            form.post(route('upvote.store',story.id),{
                preserveScroll: true
            })
        }
    }

    return(
        <div className='flex flex-col items-center'>
                    <button onClick={() => upvoteDownvote(true)} className={story.user_has_upvoted ? 'text-amber-600' : ''}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                        </svg>
                    </button>
                    <span className={'text-2xl font-semibold ' + (story.user_has_upvoted || story.user_has_downvoted ? 'text-amber-600' : '')}>
                        {story.upvote_count}
                        </span>
                    <button onClick={() => upvoteDownvote(false)} className={story.user_has_downvoted ? 'text-amber-600' : ''}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                </div>
    )
}