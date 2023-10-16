import connect from "@/dbConfig/dbConfig";
import CartModel from "@/model/cart";
import { NextRequest,NextResponse } from "next/server";
var jwt = require('jsonwebtoken');

connect();

export async function GET(req:NextRequest){
    

    try{

        const projections={
            productName:1,
            color:1,
            size:1,
            _id:0,
            price:1,
            quantity:1,
            productId:1,
            slug:1,
        }
    
    const token = req.headers.get('token');
    const jwtData = jwt.verify(token,'token for json web token');
    const userID = jwtData.id;

    const cartItems = await CartModel.find({userID:userID},projections);
 
    
    if(cartItems.length > 0){

        return NextResponse.json({success:true,cartItems});
    }
    else{

        return NextResponse.json({success:false,message:'No carts items found'});

    }
}
catch(err){

    
    return NextResponse.json({success:false,error:err,message:'something went wrong'});

}

}