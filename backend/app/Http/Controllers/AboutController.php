<?php

namespace App\Http\Controllers;
use App\Models\AboutPage;
use App\Models\Contect;
use Illuminate\Http\Request;

class AboutController extends Controller
{
    //
 public function GetAbout(){

    $res= AboutPage::all();

    return $res;
}

public function GetContect(){
    $contact= Contect::first();
    return $contact;
}

}
