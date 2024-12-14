<?php

namespace App\Enum;

enum PermissionsEnum: string
{
    case ManageStories = 'manage_stories';
    case ManageUsers = 'manage_users';
    case ManageComments = 'manage_comments';
    case UpvoteDownvote = 'upvote_downvote';


}
