import { NextResponse } from "next/server";

export async function GET(){
 
  try{
        const response = NextResponse.json({message:"Log Out Success",success:true})

        response.cookies.delete('adminToken');

        return response;


    }catch(err){

        return NextResponse.json({success:false,error:err});

    }
}