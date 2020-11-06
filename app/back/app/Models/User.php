<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class User extends Model
{
    use HasFactory, Notifiable;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'lastname',
        'document',
        'city',
        'phone',
        'mail',
        'authorization'
    ];

    protected static $rules = [
        'name' => 'required',//|unique:posts|max:255',
        'lastname' => 'required',
        'document' => 'required',
        'city' => 'required',
        'phone' => 'required',
        'mail' => 'required|email',
        'authorization' => 'required',
    ];
}
