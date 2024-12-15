<?php

namespace App\Http\Controllers;

use App\Models\Story;
use Illuminate\Http\Request;
use Inertia\Inertia;
 use App\Http\Resources\StoryResource;


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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Story $story)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Story $story)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Story $story)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Story $story)
    {
        //
    }
}
