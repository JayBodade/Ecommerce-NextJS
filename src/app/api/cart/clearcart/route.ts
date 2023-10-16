import connect from "@/dbConfig/dbConfig";
import CartModel from "@/model/cart";
import { NextRequest,NextResponse } from "next/server";
var jwt = require('jsonwebtoken');

connect();



export async function DELETE(req:NextRequest){

   


    try{

        const token = req.headers.get('token');
        const jwtData = jwt.verify(token,'token for json web token');
        const userID = jwtData.id;
        const data = await CartModel.deleteMany({userID:userID});
        
        if(data.acknowledged){

            return NextResponse.json({success:true,message:'Cart Cleared Successfully'});

        }else{

            return NextResponse.json({success:false,message:'something went wrong from cart'});

        }


    }catch(err){
     return NextResponse.json({error:err,message:"something went wrong"});
    }

}