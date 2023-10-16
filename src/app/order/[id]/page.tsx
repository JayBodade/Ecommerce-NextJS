
import React from 'react'
import { cookies } from 'next/headers'
import Link  from "next/link";



async function getOrderProducts(id:string){

  const cookiesStore =  cookies();
  const token = cookiesStore.get('token')?.value || '';
  if(token !== ''){

    const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/orders/getorderproducts`,{
      method:'GET',
      headers:{
        orderId:id,
        token:token,

      }
    })

    const data = await response.json();

    if(data.success){
    
      return data.OrderData;

    }
    
  

  }
  {
    return {};
  }
}

const  Order = async ({params}:any) => {

 
  

  const OrderProducts = await getOrderProducts(params.id);
  
  const productdata=OrderProducts.products;

  if (Object.keys(OrderProducts).length === 0) {
     return (<section className="text-gray-600 body-font">
     <div className="container px-5 py-24 mx-auto">
       <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
         <h1 className="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">Slow-carb next level shoindxgoitch ethical authentic, scenester sriracha forage.</h1>
        <Link href={'/login'}> <button className="flex-shrink-0 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg mt-10 sm:mt-0">Login</button></Link>
       </div>
     </div>
   </section>)
  }
  else{
    
  return (
    <div>
        <section className="text-gray-600 body-font overflow-hidden">

        {productdata.map((product:any,index:any)=>{


    return <div key={index} className="container px-5 py-24  mx-auto justify-center">
    
    <div className="lg:w-4/5 mx-auto border   flex flex-wrap">
      <div className="lg:w-2/3 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.productName}</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{product.productName}</h1>
        <div className="flex mb-4">
          <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">Description</a>
      
        </div>
        <p className="leading-relaxed mb-4">{product.desc}</p>
        <div className="flex border-t border-gray-200 px-2 py-2">
          <span className="text-gray-500">Color</span>
          <span className="ml-auto text-gray-900 ">{product.color !== '' ? product.color : 'No Color'}</span>
        </div>
        <div className="flex border-t border-gray-200 px-2 py-2">
          <span className="text-gray-500">Size</span>
          <span className="ml-auto text-gray-900">{product.size !== '' ? product.size : 'No Size'}</span>
        </div>
        <div className="flex border-t border-b mb-6 px-2 border-gray-200 py-2">
          <span className="text-gray-500">Quantity</span>
          <span className="ml-auto text-gray-900">{product.quantity}</span>
        </div>
        <div className="flex">
         <span className="title-font font-medium text-2xl text-gray-900 px-2">  Price : {product.price}</span>
         
        </div>
      </div>
      <img alt="ecommerce" className="lg:w-1/3 w-full lg:h-1/3 h-60 object-cover object-center rounded" src={'/uploads/'+product.image}/>
    </div>
  </div>
       

   })}
</section>

<section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
      <div className="p-2 sm:w-1/2 w-full">
        <div className="bg-gray-100 rounded flex p-4 h-full items-center">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
          
          </svg>
          <span className="title-font font-medium">{OrderProducts.phone}</span>
        </div>
      </div>
      <div className="p-2 sm:w-1/2 w-full">
        <div className="bg-gray-100 rounded flex p-4 h-full items-center">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
          
          </svg>
          <span className="title-font font-medium">{OrderProducts.address}</span>
        </div>
      </div>
      <div className="p-2 sm:w-1/2 w-full">
        <div className="bg-gray-100 rounded flex p-4 h-full items-center">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
            
          </svg>
          <span className="title-font font-medium">{OrderProducts.amount}</span>
        </div>
      </div>
      <div className="p-2 sm:w-1/2 w-full">
        <div className="bg-gray-100 rounded flex p-4 h-full items-center">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
           
          </svg>
          <span className="title-font font-medium">{OrderProducts.status}</span>
        </div>
      </div>
     
    </div>
    <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
  </div>
</section>
      
    </div>
  )
}
}

export default Order;
