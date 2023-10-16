import Product from "@/model/product";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";


connect();

export  async function POST(req:NextRequest){
  


    try{
        const body = await req.json();
        // const sizeArray = body.sizeArray;
        const p = await Product.create(body);
        return NextResponse.json({success:true});
    }
    catch(err:any){

        return NextResponse.json(err);

    }
}