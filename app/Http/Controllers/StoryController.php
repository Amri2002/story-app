<?php

namespace App\Http\Controllers;

use App\Models\Story;
use App\Models\Upvote;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Resources\UserResource;
 use App\Http\Resources\StoryResource;
 use Illuminate\Support\Str;
 use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\StoryListResource;

class StoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $currentUserId = Auth::id();
        //$paginated = Story::latest()
        $stories = Story::latest()
            ->withCount(['upvotes as upvote_count' => function($query) {
                $query->select(DB::raw('SUM(CASE WHEN upvote = 1 THEN 1 ELSE -1 END)'));
            }])
            ->withExists([
                'upvotes as user_has_upvoted' => function ($query) use($currentUserId){
                    $query->where('user_id', $currentUserId)
                    ->where('upvote',1);
                },
                'upvotes as user_has_downvoted' => function ($query)use($currentUserId){
                    $query->where('user_id', $currentUserId)
                    ->where('upvote',0);
                }
            ])
            //->paginate(5);
            ->get();
        return Inertia::render('Story/Index', [
            //'stories' => StoryListResource::collection($paginated)
            'stories' => StoryResource::collection($stories)
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
        $story->upvote_count = Upvote::where('story_id', $story->id)
            ->sum(DB::raw('CASE WHEN upvote = 1 THEN 1 ELSE -1 END'));

        $story->user_has_upvoted = Upvote::where('story_id', $story->id)
            ->where('user_id', Auth::id())
            ->where('upvote', 1)
            ->exists();

        $story->user_has_downvoted = Upvote::where('story_id', $story->id)
            ->where('user_id', Auth::id())
            ->where('upvote', 0)
            ->exists();


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
            'description' => ['required','string'],
        ]);
        $photo = $data ['photo'] ?? null;
        if ($photo) {
            if($story->photo){
                Storage::disk('public')->deleteDirectory(dirname
                ($story->photo));
            }
            $data['photo']= $photo->store('story/'.Str::random(), 'public');
        }

        $story->update($data);

        return to_route('story.index')->with('success', 'Story updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Story $story)
    {
        $story->delete();
        if($story->photo){
            Storage::disk('public')->deleteDirectory(dirname(
                $story->photo));
        }

        return to_route('story.index')->with('success', 'Story deleted successfully');
    }
}
