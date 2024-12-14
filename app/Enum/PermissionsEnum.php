<?php

namespace App\Enum;

enum PermissionsEnum: string
{
    case ManageStories = 'manage-stories';
    case ManageUsers = 'manage-users';
    case ManageComments = 'manage-comments';
    case UpvoteDownvote = 'upvote_downvote';


}
