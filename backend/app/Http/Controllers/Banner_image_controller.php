<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BannerImage;
class Banner_image_controller extends Controller
{
    //
    function bannerimage(){
 

       $inf=BannerImage::get();

return $inf;
    }
}
