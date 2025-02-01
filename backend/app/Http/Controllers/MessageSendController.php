<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserMessage;
class MessageSendController extends Controller
{
    public function sendMessage(Request $request){
        $validate= $request->validate([
            "user_id"=>"required",
            "name"=>"required",
            "email"=>"required",
            "phone"=>"required",
            "message"=>"required"
        ]);
        
        
        
        UserMessage::create($validate);
        return response()->json(["success"=>true,"message"=>"message Send"]);
        
        }
}
