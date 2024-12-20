<?php

namespace App\Http\Controllers;

use App\Models\Story;
use Illuminate\Http\Request;
use Inertia\Inertia;
 use App\Http\Resources\StoryResource;
 use Illuminate\Support\Str;


class StoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $paginated = Story::latest()->paginate(5);

        return Inertia::render('Story/Index', [
            'stories' => StoryResource::collection($paginated)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Story/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required','string'],
            'photo' => ['nullable','image'],
            'description' => ['required','string'],
        ]);

        $photo = $data ['photo'] ?? null;
        $data['user_id'] = auth()->id();

        if ($photo) {
            $data['photo']= $photo->store('story/'.Str::random(), 'public');
        }
        Story::create($data);

        return to_route('story.index')->with('success', 'Story created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Story $story)
    {
        return Inertia::render('Story/Show', [
            'story' => new StoryResource($story)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Story $story)
    {
        return Inertia::render('Story/Edit', [
            'story' => new StoryResource($story)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Story $story)
    {
        $data = $request->validate([
            'name' => ['required','string'],
            'photo' => ['nullable','image'],
            'description' => ['nullable','string'],
        ]);

        $story->update($data);

        return to_route('story.index')->with('success', 'Story updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Story $story)
    {
        $story->delete();
        return to_route('story.index')->with('success', 'Story deleted successfully');
    }
}
