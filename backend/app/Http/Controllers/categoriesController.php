<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\category;
class categoriesController extends Controller
{ 
    public function index()
    {
        $category = category::all();
        return response()->json($category);
    }
}
