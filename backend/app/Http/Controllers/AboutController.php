<?php

namespace App\Http\Controllers;
use App\Models\AboutPage;
use Illuminate\Http\Request;

class AboutController extends Controller
{
    //
function GetAbout(){

    $res= AboutPage::all();

    return $res;
}

}
