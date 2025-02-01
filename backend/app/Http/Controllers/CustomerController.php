<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;


class CustomerController extends Controller
{
    //
   public  function SignupCustomer(Request $request){
       $input=$request->all();
       $peopleuser=Customer::create($input);
       return response()->json(["success"=>true,"message"=>"User signup","user"=>$peopleuser]);

 
    }

}
