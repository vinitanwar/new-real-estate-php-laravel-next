<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class trendingproperty extends Model
{
    use HasFactory;
    protected $table = 'trending_properties';
    protected $fillable = [
        'title',
        'images_paths',
        'propertyvalue'


    ];

    
}
