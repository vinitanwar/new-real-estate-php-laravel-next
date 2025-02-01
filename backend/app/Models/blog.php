<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class blog extends Model
{

    use HasFactory;
    protected $table = 'blog';
    protected $fillable = [
        'title',
        'subheading',
        'date',
        'userposted_name',
        'description1',
        'heading2',
        'listdata',
        'image',
    ];
}
