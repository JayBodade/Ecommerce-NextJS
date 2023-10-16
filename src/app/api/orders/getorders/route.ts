import OrderModel from "@/model/Order";
import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Order from "@/model/Order";
var jwt = require('jsonwebtoken');
import { cookies } from 'next/headers'

connect();

export async function GET(req:NextRequest){

    try{

        const cookieStore = cookies();
 
 
        const token = req.headers.get('token') || cookieStore.get('token')?.value;;
      

        
        const jwtData = jwt.verify(token,'token for json web token');
        const userID = jwtData.id;

        const Orders = await OrderModel.find({userId:userID});
        console.log("this are orders",Orders);
       
        if(Orders.length > 0){

            return NextResponse.json({success:true,Orders});

        }else{
            return NextResponse.json({success:false,message:"no cart items"});
        }
    
    }catch(err){
        return NextResponse.json({success:false,message:"some thing went wrong",error:err})
    }
}
