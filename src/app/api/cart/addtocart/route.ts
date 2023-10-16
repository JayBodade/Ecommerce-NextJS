import mongoose from "mongoose";
import connect from "@/dbConfig/dbConfig";
import CartModel from "@/model/cart";
import { NextRequest,NextResponse } from "next/server";
import Product from "@/model/product";
var jwt = require('jsonwebtoken');

connect();

export async function POST(request:NextRequest){


        try{ 
   
        const projections={
            _id:1,
            slug:1,
        }
       
        let token = request.headers.get('token');
        const id = jwt.verify(token,'token for json web token');
        let body = await request.json();
        const productData = await Product.find({title:body.productName,color:body.color,size:body.size},projections);
        body.productId=productData[0]._id;
        body.slug=productData[0].slug;
   
       
        body.userID=id.id;
        let cartItem = await CartModel.create(body);
        if(cartItem){
            return NextResponse.json({ success:true,cartItem,message:"successfully added to cart"});
        }
        else{
            return NextResponse.json({ success:false,message:'something went wrong'});
        }
    }catch(err){

        return NextResponse.json({ success:false,error:err});

    }
       

   
    




}