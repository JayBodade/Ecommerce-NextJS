import Product from '@/model/product';
import { NextRequest,NextResponse } from 'next/server';
import connect from '@/dbConfig/dbConfig';
import { NEXT_RSC_UNION_QUERY } from 'next/dist/client/components/app-router-headers';

connect();

export async function GET(req:NextRequest){

   


    try{


        const projections = {
            title:1,
            img:1,
            size:1,
            color:1,
            price:1,
            slug:1,
            _id:0,
        }
        
        const category = req.headers.get('category');
        

        const products:any =  await Product.find({category:category,availableQty:{$gt:0}},projections);
        


     
     
        let uniqueTitle:any = [];
        let data: any = [];
        for(let i=0; i<products.length;i++){
          
            if(!uniqueTitle.includes(products[i].title)){
                uniqueTitle.push(products[i].title);
                data.push(products[i]);
            }   
        }    
        
       
        
        let colorsToSizeMappin:any = [];
        for(let i=0;i<products.length;i++){
            if(uniqueTitle.includes(products[i].title)){
                let index = uniqueTitle.indexOf(products[i].title);
                if(data[index].color!==''){
                   
                    let colorArray = data[index].color.split(',');
                if(!colorArray.includes(products[i].color)){
                    data[index].color += ','+products[i].color;
                }}

                  if(data[index].size!==''){
                let sizeArray = data[index].size.split(',');
                if(!sizeArray.includes(products[i].size)){
                    data[index].size += ','+products[i].size;}}

            }
        }

    
        if(products.length > 0){
            return NextResponse.json({success:true,data});
        }
        else{
            return NextResponse.json({success:false,message:'No Products Found',data:[]})
        }
        
       
        
        

    }catch(err:any){

        return NextResponse.json({err});

    }
}