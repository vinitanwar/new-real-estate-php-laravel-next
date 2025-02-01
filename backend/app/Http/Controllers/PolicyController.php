<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PrivacyPolicyPage;
class PolicyController extends Controller
{
    //
    function getPolicy(){
        $res=PrivacyPolicyPage::all();
        return $res;
    }
}
