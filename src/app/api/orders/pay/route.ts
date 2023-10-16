import OrderModel from "@/model/Order";
import ProductModel from "@/model/product";
import CartModel from "@/model/cart";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig"
var jwt = require('jsonwebtoken');;
import { cookies } from 'next/headers';


connect();

export async function POST(req: NextRequest) {

    try {

    const projections={
        availableQty:1,
        _id:0,
    }
   
    const body = await req.json();

    const products = body.products;
    let resArray = [];
    let qtyArray = [];


    for(let i=0;i<products.length;i++){

        const qty = products[i].quantity;
        const dbquantity = await ProductModel.find({_id:products[i].productId},projections);
       
        if(qty > dbquantity[0].availableQty){
            resArray.push(products[i]);
            qtyArray.push(dbquantity[0].availableQty);
        }
        
    }

    if(resArray.length > 0){

        return NextResponse.json({resArray,qtyArray});

    }else{
        const cookieStore = cookies();
        const token = cookieStore.get('token')?.value;
        const jwtData = jwt.verify(token, 'token for json web token');
        const userId = jwtData.id;
       
        body.userId = userId;
       
        let count=0;
        for (let i = 0; i < products.length; i++) {


            const ack = await ProductModel.findByIdAndUpdate(products[i].productId, {
                $inc: {
                  availableQty: -products[i].quantity,
                },
              });
            
            if(ack){
                count++;
            }
    }

    console.log(products);

    if(count===products.length){
        
    const order = await OrderModel.create(body);

    if (order) {
        let cart = await CartModel.deleteMany({ userID: userId });

        if (cart.acknowledged) {

            return NextResponse.json({resArray,qtyArray, success: true, message: "Order created successfully" });

        }
        else {
            return NextResponse.json({resArray,qtyArray, success: false, message: "Something went wrong please try again later" });

        }
    }
    else {
        return NextResponse.json({ resArray,qtyArray,success: false, message: "Something went wrong please try again later" });


    }
}else{
    return NextResponse.json({resArray,qtyArray, success: false, message: "Something went wrong please try again later" });
}
    }
}catch (err) {
    return NextResponse.json({ success: false, error: err, message: "something went wrong" });
}


   
}


