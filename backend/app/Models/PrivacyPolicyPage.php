<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrivacyPolicyPage extends Model
{
    use HasFactory;
    protected $table = 'privacy_policy_page';
    protected $fillable = [
        'hero_img_1',
        'description1',
        'description2',
        'description3',
    ];
}
