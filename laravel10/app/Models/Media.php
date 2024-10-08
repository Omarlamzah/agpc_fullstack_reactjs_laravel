<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $table = 'webinar_videos';

    protected $fillable = [
        'type', 'titre', 'description', 'date', 'video', 'poster', 'etat', 'ordre', 'date_creation', 'lien'
    ];

    public $timestamps = false;

    use HasFactory;
}
