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
        'department',
        'city',
        'phone',
        'mail',
        'authorization'
    ];

    protected static $rules = [
        'name' => 'required|string',
        'lastname' => 'required|string',
        'document' => 'required|float',
        'department' => 'required|string',
        'city' => 'required|string',
        'phone' => 'required|float',
        'mail' => 'required|email',
        'authorization' => 'required',
    ];
}
