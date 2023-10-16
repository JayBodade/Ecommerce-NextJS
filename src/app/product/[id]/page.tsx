
import React from 'react'
import ProductComponent from '@/app/product/[id]/product';
import { Metadata } from 'next';

interface ProductProps {
  title: string,
  slug: string,
  desc: string,
  img: string,
  category: string,
  size: string,
  color: string,
  price: number,
  availableQty: number,

};


export const metadata : Metadata ={

 
  title:'',
  description:'find the best stickers for coders'
  
}


async function getProducts(id: any) {

  const response = await fetch(process.env.NEXT_PUBLIC_HOSTNAME+'/api/product/getProduct',{
    method:'GET',
    headers:{
      'content-type':'application/json',
      pid:id,

    }
    ,cache:'no-store',
  })
  const result = await response.json();


 
  
  return result;
}


async function getProductVariants(name:any){

 
  const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/product/getVariant`,
  {
    method:'GET',
    headers:{
      'Content-Type':'application/json',
      productSlug:name,
      
    },
    next:{revalidate:10},
  });
  const product = await response.json();

  return product;

}




const ProductDetail =  async ({params}:any) => {


  const product:ProductProps[] = await getProducts(params.id);
    
  const {variants,allVariants} = await getProductVariants(params.id);


  if(product.length > 0)
{

  metadata.title = product[0].title;
  metadata.description = product[0].desc;
} 
 

 

  if(product.length > 0){
  return (
    <div>
    <ProductComponent product={product} allVariants={allVariants}  id={params.id}/>
    
     {/* {params.id}; */}
    </div>
  )
  }
  else{
    let urlparams =  params.id.split('-');
    const color = urlparams[urlparams.length - 2];
   
    const size = urlparams[urlparams.length - 1];
   
    return (
     
      <div>
        Currently no product availabe of color {color} size {size} ... please visit this page later
        or you can select different size or color
      </div>
    )
  }
}

export default ProductDetail;
