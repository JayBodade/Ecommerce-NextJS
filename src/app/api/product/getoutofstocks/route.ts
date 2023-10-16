import Product from "@/model/product";
import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req:NextRequest){

   
  const projections = {
    title:1,
    color:1,
    size:1,
    _id:1,
    img:1,
  }

    try{
   
    const products = await Product.find({availableQty:0},projections).limit(4);

    return NextResponse.json({success:true,products});
    }
    catch(err){

        return NextResponse.json({success:false,error:err});
    }
}