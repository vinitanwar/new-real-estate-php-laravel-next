<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class State extends Model
{
    use HasFactory;

    protected $table = 'states';  // Optional if the table name is the plural form of the model

    // Define the columns that are mass assignable
    protected $fillable = [
        'name', // Name of the state
    ];

    // Define the relationship with the City model
    public function cities()
    {
        return $this->hasMany(City::class, 'state_id'); // One State has many Cities
    }
}
