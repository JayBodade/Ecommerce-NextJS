import UserModel from "@/model/user";
import connect from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import { cookies } from "next/headers";
var jwt = require('jsonwebtoken');

export async function PUT(req:NextRequest){


    try{
        const body = await req.json();
     
        const token = req.headers.get('token');
         const tokenData = jwt.verify(token,"token for json web token");
 
        const user = await UserModel.findOneAndUpdate({_id:tokenData.id},
           { $set: { username: body.username, address: body.address, phone: body.phone, pinCode: body.pinCode }},
    { new: true }
            );
        
            
       return NextResponse.json({success:true});
    }catch(err){
        return NextResponse.json({err,success:false});
    }
    
 
}