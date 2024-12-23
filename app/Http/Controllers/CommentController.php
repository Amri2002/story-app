<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Story;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(Request $request, Story $story)
    {
        $data = $request->validate([
            'comment' => 'required'
        ]);

        $data['story_id'] = $story->id;
        $data['user_id'] = Auth::id();
        Comment::create($data);

        return to_route('story.show', $story);
    }
    public function destroy(Comment $comment)
    {
        if ($comment->user_id !== Auth::id()) {
            abort(403);
        }
        $storyId = $comment->story_id;
        $comment->delete();
        return to_route('story.show', $storyId);
    }
}
