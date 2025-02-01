<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\testimonial;

class TestimonialController extends Controller
{
    public function index()
    {
        $trendingProperties = testimonial::all();
        return response()->json($trendingProperties);
    }
}
