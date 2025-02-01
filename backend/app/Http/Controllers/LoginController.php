<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    //
  public  function login(Request $request){
    $email=$request->input("email");
     $res=Customer::where("email",$email)->first();
     $inputpassword=$request->password;
     
  if(!$res){
    return response()->json(["success"=>false,"message"=>" invalid email or password"]);

  }
  elseif(!Hash::check($inputpassword,$res->password)){
    return response()->json(["success"=>false,"message"=>" invalid email or password"]);

  }else{
    return response()->json(["success"=>true,"message"=>"login Success","user"=>$res]);

  }



   


    }
}
