import Product from "@/model/product";
import { NextRequest,NextResponse } from "next/server";
import connect from '@/dbConfig/dbConfig'


connect();


export async function PUT(req:NextRequest){


    try{
    const productId = req.headers.get('productId');

    const body = await req.json();
    const ack = await Product.findByIdAndUpdate({_id:productId},{availableQty:body.quantity})
    
    if(ack){
        
        return NextResponse.json({success:true,message:'Updated Successfully'});

    }
    else{
         return NextResponse.json({success:false,message:'Something went wrong'});
    }
}catch(err){
    return NextResponse.json({success:false,err});
}
}   