<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
public function SendMessage(Request $request){
    $validate= $request->validate([
"name"=>"required",
"email"=>"required",
"number"=>"required",
"message"=>"required",
    ]);
     $message = Message::create($request->all());
if($message){
    return response()->json(["success"=>true,"message"=>"Message sent"]);
}else{
    return response()->json(["success"=>false,"message"=>"Message Error!"]);
}
}

}
