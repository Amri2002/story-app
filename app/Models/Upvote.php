<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Upvote extends Model
{
    public $timestamps = false;
    protected $fillable = ['story_id', 'user_id', 'upvote'];
    public function story(): BelongsTo
    {
        return $this->belongsTo(Story::class);
    }
}
