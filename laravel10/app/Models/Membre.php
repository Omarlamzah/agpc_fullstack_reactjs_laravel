<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Membre extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'photo',
        'civilite',
        'nom',
        'prenom',
        'telephone',
        'adresse',
        'ville',
        'email',
    ];
    use HasFactory;
}
