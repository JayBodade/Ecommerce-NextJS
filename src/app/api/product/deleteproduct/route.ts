import Product from '@/model/product';
import connect from '@/dbConfig/dbConfig';
import { NextRequest,NextResponse } from 'next/server';


export async function DELETE(req:NextRequest){

    try{

    const pid = req.headers.get('pid');

    const ack =await  Product.findByIdAndDelete(pid);

    return NextResponse.json({success:true,ack});

    }catch(err:any){
        return NextResponse.json({success:false,err});
    }



}