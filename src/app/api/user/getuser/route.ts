import UserModel from "@/model/user";
import connect from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import { cookies } from "next/headers";
var jwt = require('jsonwebtoken');


connect();

export  async function GET(req:NextRequest){

    

    try{
    const CookieStore = cookies();
    const token = CookieStore.get('token')?.value || req.headers.get('token');

    const tokenData = jwt.verify(token,'token for json web token');

    const userData = await UserModel.findById(tokenData.id,{password:0,_id:0});
   
    return NextResponse.json({success:true,userData});
    }catch(err){

        return NextResponse.json({success:false,error:err});
    }


    
}