<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
class categoriesController extends Controller
{ 
    public function index()
    {
        $category = Category::all();
        return response()->json($category);
    }
}
