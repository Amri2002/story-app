import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, usePage, useForm} from '@inertiajs/react';
import {Story, PageProps, PaginatedData} from "@/types";
import FeatureItem from "@/Components/StoryItem";
import StoryItem from '@/Components/StoryItem';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { create } from 'domain';
import { FormEventHandler } from 'react';
import TextArea from '@/Components/TextArea';
//import {can} from "@/helpers";


export default function Show({story}:{story: Story}) {
    const{
        data,
        setData,
        processing, 
        errors,
        post
    } = useForm({
        name: story.name,
        photo: null as File | null,
        description: story.description,
        _method: 'PUT'
    })

    const updateStory: FormEventHandler = (ev) => {
        ev.preventDefault();
        post(route('story.update', story.id),{
            preserveScroll: true,   
        });
    }
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit Story: <b>{story.name}</b>
                </h2>
            }
        >
            <Head title={'Edit Story ' + story.name} />            
            <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8">
                <form onSubmit={updateStory} className='w-full'>
                

                <div className='mb-8'>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        //required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>
                {story.photo && (
                    <div className='mb-4'><img src={story.photo} className='w-64' />
                    </div>)}
                <div className='mb-8'>
                    <InputLabel htmlFor="photo" value="Photo" />
                        <TextInput
                            id="photo"
                            type="file"
                            className="mt-1 block w-full"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setData('photo', e.target.files[0]);
                                }
                            }}
                                />
                    <InputError className="mt-2" message={errors.photo} />
                </div>

                <div className='mb-8'>
                    <InputLabel htmlFor="description" value="Description" />

                    <TextArea
                        id="description"
                        rows = {6}
                        className="mt-1 block w-full"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        //required
                    />
                    <InputError className="mt-2" message={errors.description} />
                </div>

                <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>Save</PrimaryButton>
                </div>
                </form>
            </div>
        </div> 
        </AuthenticatedLayout>
    );
}
