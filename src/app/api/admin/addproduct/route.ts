import Product from "@/model/product";
import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import mongoose from 'mongoose'


connect();

export async function POST(req: NextRequest) {


  try{

  const body = await req.json();
  let data = body.data;
  let sizeArray = body.sizeArray;
  if (data.category === 'tshirts' || data.category === 'hoodies') {
    let slug = data.slug;
    for (let i = 0; i < sizeArray.length; i++) {
      let tempdata = data;
      tempdata.slug = slug + '-' + sizeArray[i];
      tempdata.size = sizeArray[i];
      const product = await Product.create(tempdata);
      console.log(product);
    }

    return NextResponse.json({success:true});


  }
  else{
    const product = await Product.create(data);
    if(product){
      return NextResponse.json({success:true});
    }
    else{
      return NextResponse.json({success:false});
    }
  }



  }catch(err:any){
    return NextResponse.json({success:false,err})
  }




}
