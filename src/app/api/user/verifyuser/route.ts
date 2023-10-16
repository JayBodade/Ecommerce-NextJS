import User from "@/model/user";
import { NextRequest,NextMiddleware, NextResponse } from "next/server";


export async function GET(req:NextRequest){


    try{
    const projection={
        _id:1,
    }
   const vid=req.headers.get('vid');
  
   const user = await User.findOne({verificationToken:vid},projection);
  
   if(user){

    const update = await User.findByIdAndUpdate(user._id,{verified:true,verificationToken:''})

    return NextResponse.json({success:true})

   }
   else{

    return NextResponse.json({success:false});

   }
}catch(err:any){
    return NextResponse.json({success:false});
}
   
}