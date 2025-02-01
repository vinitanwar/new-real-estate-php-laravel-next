<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\trendingproperty;

class TrendingPropertyController extends Controller
{
    //
    public function index()
    {
        $trendingProperties = trendingproperty::all();
        return response()->json($trendingProperties);
    }
}
