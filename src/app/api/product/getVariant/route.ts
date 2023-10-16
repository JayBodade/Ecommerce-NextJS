import Product from '@/model/product';
import connect from '@/dbConfig/dbConfig';

import { NextRequest,NextResponse } from 'next/server';


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
                     // Define the colorVariant property
      };

      const projections={
        color:1,
        size:1,
        _id:1,
        title:1,
      
    
      }
   
    try{

        const productSlug =  req.headers.get('productSlug');
        const colorSlug = req.headers.get('colorSlug');
            
       
        const product:ProductProps[] = await Product.find({slug:productSlug});

        const name = product[0].title ;

    
        const firstcolor = colorSlug || product[0].color;

       
        const allProducts = await Product.find({title:name, availableQty: { $gt: 0 }},projections);
        
        let colorVariants:any = [];

        let sizeVariants:any = [];

        let allVariants:any = {
        }
        

      
        for(let i=0;i<allProducts.length;i++){
            allVariants[allProducts[i].color] = [];
        }

        
        for(let i=0;i<allProducts.length;i++){
           
            allVariants[allProducts[i].color].push(allProducts[i].size);
        }

        
     

        for(let i=0;i<allProducts.length;i++){
            if( !colorVariants.includes(allProducts[i].color)){
                colorVariants.push(allProducts[i].color);                
            }

            if(firstcolor === allProducts[i].color && !sizeVariants.includes(allProducts[i].size)){
                sizeVariants.push(allProducts[i].size);                
            }
        }


        const variants = {
            colorVariants:colorVariants,
            sizeVariants:sizeVariants,

        }

       

        return NextResponse.json({variants,allVariants});

      

    }catch(err){
        return NextResponse.json({err:"something went wrong"});
    }

}
