<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    //
    function login(Request $request){

$validate=$request->validate([
    "email"=>"required",
    "password"=>"required|min:6"
]);

$verifyuser= Customer::where("email",$validate["email"])->first();
if(!$verifyuser){
    return response()->json(["success"=>false,"message"=>"enter valide data"]);
}
if(!Hash::check($validate["password"], $verifyuser["password"])){
    return response()->json(["success"=>false,"message"=>"enter valide data"]);
}else{
    return response()->json(["success"=>true,"message"=>"Login successfully","user"=>$verifyuser]);

}




 



    }
}
