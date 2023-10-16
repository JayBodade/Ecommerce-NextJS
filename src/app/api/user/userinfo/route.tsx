import UserModel from "@/model/user";
import connect from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";


connect();

export  async function GET(req:NextRequest){

    

    try{

     const email = req.headers.get('email');
  
    const userData = await UserModel.findOne({email:email});
    console.log(userData);
   if(userData){
    return NextResponse.json({success:true,message:'user found'});
   }else{
    return NextResponse.json({success:false,message:'user not found'});
   }
    
    }catch(err){

        return NextResponse.json({success:false,error:err});
    }


    
}