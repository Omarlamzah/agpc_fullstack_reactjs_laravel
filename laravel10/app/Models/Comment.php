<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $fillable = ['video_id', 'comment'];

    public function video()
    {
        return $this->belongsTo(Video::class, 'video_id');
    }
}
