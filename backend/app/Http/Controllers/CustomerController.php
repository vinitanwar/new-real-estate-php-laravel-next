<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;

class CustomerController extends Controller
{
    //
     public function SignupCustomer(Request $request){
       
       $validate= $request->validate([
        "name"=>"required|min:3",
"phone_number"=>"required",
"email"=>"required",
"password"=>"required|min:6"
       ]);
       

// if($validate->fails()){
//     return response()->json(["success"=>false,"message"=>$validate->errors()->all()]);
// }

$allreadycustomer =Customer::where("email",$validate["email"])->orWhere("phone_number",$validate["phone_number"])->first();
if($allreadycustomer){
    return response()->json(["success"=>false,"message"=>"Email or Mobile Number All ready exist"]);
}

       $peopleuser=Customer::create($validate);
       return response()->json(["success"=>true,"user"=>$peopleuser]);
    


    }

}
