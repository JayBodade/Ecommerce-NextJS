import OrderModel from "@/model/Order";
import connect from "@/dbConfig/dbConfig";
import ProductModel from "@/model/product";
import { NextRequest, NextResponse } from "next/server";
var jwt = require('jsonwebtoken');
;

connect();

interface OrderProps {
      products: ProductProps[];
        phone:string;
        address:string;
       amount:number;
        status:string;
        
}

interface ProductProps{

      image:string,
      desc:string,
      productName:string,
     
      quantity:number,
      slug:string,
      price:number,
      address:string,
      color:string,
      size:string,

}

export async function GET(req:NextRequest){

   

      const token = req.headers.get('token');
      
      if(token===''){
           
            return NextResponse.redirect('/login');
        }
      const jwtData = jwt.verify(token,'token for json web token');
      const userId=jwtData.id;
      const orderId = req.headers.get('orderId');

      const Orders:any = await OrderModel.find({_id:orderId,userId:userId});

      let productOrders = Orders[0].products ;
   
      

      let productDataArray:ProductProps[]= [];

     
      
        
      if(productOrders.length > 0){

            for(let i=0;i<productOrders.length;i++){

                  const productData = await ProductModel.findById(productOrders[i].productId);
            
                  const image = productData.img;

                  let data:ProductProps = {
                        image:productData.img,
                        desc:productData.desc,
                        productName:productOrders[i].productName,
                        size:productOrders[i].size,
                        quantity:productOrders[i].quantity,
                        price:productOrders[i].price,
                        address:productOrders[i].address, 
                        slug:productOrders[i].slug, 
                        color:productOrders[i].color,
                        
                  }

                  productDataArray.push(data);

            }

            let OrderData:OrderProps={
                  products:productDataArray,
                  phone:Orders[0].phone,
                  address:Orders[0].address,
                  amount:Orders[0].amount,
                  status:Orders[0].status,

            }

            


            return NextResponse.json({success:true,OrderData})



      }
      else{
            return NextResponse.json({success:false,message:'No Product Found'});
      }

      
       
//      }catch(err){

//       return NextResponse.json({success:false,error:err});
//      }

   
}
