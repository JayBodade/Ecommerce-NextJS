import Product from "@/model/product";
import connect from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req:NextRequest){

//  try{
    const projections={
        availableQty:1,
        _id:0,
    }
    const {products} = await req.json();

    let resArray = [];
    let qtyArray = [];


    for(let i=0;i<products.length;i++){

        const qty = products[i].quantity;
        const dbquantity = await Product.find({_id:products[i].productId},projections);
       
        if(qty > dbquantity[0].availableQty){
            resArray.push(products[i]);
            qtyArray.push(dbquantity[0].availableQty);
        }
        
    }



    return NextResponse.json({resArray,qtyArray});
// }catch(err){
//     return NextResponse.json({success:false,message:"something went wrong"});
// }
}