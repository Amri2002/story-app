import React, { FormEventHandler } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Story } from '@/types';
import TextArea from '@/Components/TextArea';
import PrimaryButton from '@/Components/PrimaryButton';
//import { can } from '@/helpers';

export default function NewCommentForm({story}: {story: Story}){
    const user = usePage().props.auth.user;

    const {
      data,
      setData,
      post,
      processing
    } = useForm({
      comment: ''
    })
  
    const createComment: FormEventHandler = (ev) => {
      ev.preventDefault();
  
      post(route('comment.store', story.id), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => setData('comment', '')
      })
    }
  

  
    return(
        <form onSubmit={createComment} className="flex items-center py-2 rounded-lg bg-gray-50 dark:bg-gray-800 mb-4">
        <TextArea
          rows={1}
          value={data.comment}
          onChange={e => setData('comment', e.target.value)}
          className="mt-1 block w-full"
          placeholder="Your comment"
        ></TextArea>
        <PrimaryButton disabled={processing}>Comment</PrimaryButton>
      </form>
    );
}