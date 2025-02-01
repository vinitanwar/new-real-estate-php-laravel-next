<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sitelayout extends Model
{
   protected $fillable=[
    "p_color",
    "s_color",
    "logo",
    "number1",
    "number2",
    "email",
    "address"
   ];
}
