<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;

    protected $table = 'city';  // Optional if the table name is the plural form of the model

    // Define the columns that are mass assignable
    protected $fillable = [
        'city', // City name
        'state_id', // Foreign key for the state
    ];

    // Define the relationship with the State model
    public function state()
    {
        return $this->belongsTo(State::class, 'state_id'); // City belongs to one State
    }
}
