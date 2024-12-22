<?php

namespace App\Http\Controllers;
use App\Models\Story;
use App\Models\Upvote;
use Illuminate\Http\Request;

class UpvoteController extends Controller
{
    public function store(Request $request,Story $story)
    {
        $data = $request->validate([
            'upvote' => ['required', 'boolean']
        ]);

        Upvote::updateOrCreate(
            ['story_id' => $story->id, 'user_id' => auth()->id()],
            ['upvote' => $data['upvote']]
        );

        return back();
    }

    public function destroy(Story $story)
    {

        $story->upvotes()->where('user_id', auth()->id())->delete();

        return back();
    }
}
