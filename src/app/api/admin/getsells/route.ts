import Order from "@/model/Order";
import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";



connect();

export async function GET(req: NextRequest) {


  try{

    const pipeline = [
        {
          $project: {
            productCount: { $size: "$products" }, 
            amount: 1, 
            _id: 0, 
            createdAt:1,
          },
        },
      ];

      const Orders = await Order.aggregate(pipeline).exec();

      const day = new Date(Date.now());
      let date = day.getDate()+'/'+day.getMonth()+'/'+day.getFullYear();


     let totalamount = 0;
     let sells = 0;
     let todaysAmount = 0;
     let todaysSells = 0;

     for(let i = 0;i<Orders.length;i++){
        let OrderCreatedAtDate = new Date(Orders[i].createdAt);
        const OrderDate = OrderCreatedAtDate.getDate()+'/'+OrderCreatedAtDate.getMonth()+'/'+OrderCreatedAtDate.getFullYear();
        if(OrderDate === date){
          todaysAmount += Orders[i].amount;
          todaysSells += Orders[i].productCount;

        }
        totalamount += Orders[i].amount;
        sells += Orders[i].productCount;
     }

      return NextResponse.json({success:true,totalamount,sells,todaysAmount,todaysSells});


  }catch(err:any){
    return NextResponse.json({success:false,err})
  }




}
