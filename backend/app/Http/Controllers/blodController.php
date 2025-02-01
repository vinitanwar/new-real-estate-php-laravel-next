<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\blog;
class blodController extends Controller
{
    public function index()
    {
        $trendingProperties = blog::all();
        return response()->json($trendingProperties);
    }
}
