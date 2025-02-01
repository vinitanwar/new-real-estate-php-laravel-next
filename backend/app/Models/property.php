<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class property extends Model
{
    use HasFactory;
    protected $table = 'properties';

    public function category()
{
    return $this->belongsTo(Category::class);
}
    protected $fillable = [
        'name',
        'slug',
        'property_id',
        'price',
        'rate_per_square_feet',
        'images_paths',
        'agent_post_id',
        'type',
        'bedrooms',
        'bathrooms',
        'property_description_1',
        'property_description_2',
        'multiple_features',
        'address',
        'google_map_lat',
        'google_map_long',
        'active',
        'state',
        'city',
        'neighbourhood',
        'furnishing', 
        'project_status', 
        'listed_by', 
        'maintenance_monthly', 
        'floor_no', 

    ];

    // Optionally, you can cast JSON fields to array
    protected $casts = [
        'images_paths' => 'array',
        'multiple_features' => 'array',
    ];

    public function agent()
    {
        return $this->belongsTo(User::class, 'agent_post_id');
    }

    
}
