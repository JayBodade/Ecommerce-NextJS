import ComplaintsModel from "@/model/complaint";
import { NextRequest,NextResponse } from "next/server";
import { cookies } from 'next/headers'
var jwt = require('jsonwebtoken');
 


export async function POST(req:NextRequest){

    try{

    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value;

    const jwtData = jwt.verify(token,'token for json web token');
    const userId = jwtData.id;

    const body = await req.json();

    const complaint = {
        userId:userId,
        complaintTitle:body.querytitle,
        complaintDesc:body.querydesc,
    }
    
    const query = await ComplaintsModel.create(complaint);

    if(query){
        return NextResponse.json({success:true,message:'Complaint Sent Successfully'})
    }
    else{
        return NextResponse.json({success:false,message:'Somehting went wrong please try again later'})

    }

}catch(err:any){
    return NextResponse.json({success:true,err})
}





}