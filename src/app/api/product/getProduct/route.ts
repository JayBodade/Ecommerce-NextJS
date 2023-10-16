import Product from "@/model/product";
import { NextRequest,NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";


connect();

export async function GET(req:NextRequest){
   

    interface ProductProps {
        title: string;
        slug:string,
        desc:string,
        img:string,
        category:string,
        size:string,
        color:string,
        price:number,
        availableQty:number,
        colorVariant: string[];
        sizeVariant:string[]; // Define the colorVariant property
      };
      
    try{

    
    const pid = req.headers.get('pid');
  
    let product:ProductProps[] = await Product.find({slug:pid});  

     
     return NextResponse.json(product);  
     
       

    }catch(e){
        return NextResponse.json({e:"something went wrong"});
    }


}