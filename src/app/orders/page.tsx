"use client";
import React, { useState,useEffect } from 'react'
import useSWR from 'swr';
import Link from 'next/link';
import {useRouter} from 'next/navigation'

const fetchOrders = async (url:any,token:any) =>{

    

  const response = await fetch(url,{
    method:'GET',
    headers:{
      token:token
    },
  });

  const data = await response.json();
  console.log(data);
  return data.Orders;

}


const Orders = () => {

  const [token, setToken] = useState('');
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
   
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);


  
  const {data ,error,isLoading} = useSWR([`${process.env.NEXT_PUBLIC_HOSTNAME}/api/orders/getorders`, token], ([url, token]) => fetchOrders(url, token))
  
 console.log(error);
  if(error){

    return <div>Something went wrong</div>

  }
  else{

  
 
    return (
      
      <div>
       
    <section className="text-gray-600 body-font min-h-screen">
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-col text-center w-full mb-20">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">My Orders</h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them.</p>
      </div>
      

    
     
    {isLoading ? <div className="flex items-center justify-center h-96">
  <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
</div>

      : <div className="flex flex-wrap -m-2 320:px-10 md:px-20 lg:px-20">
      {data && data.map((order:any,index:number)=>{
        return <Link href={`/order/${order._id}`} className="p-2 320:text-xs 320:w-full md:text-xs lg:text-base xl:text-lg lg:w-1/3 md:w-1/2 w-full hover:cursor-pointer"><div  >
        <div className="h-full flex items-center  border-gray-200 border p-4 rounded-lg">
          <div className="flex-grow">
            <h2 className="text-gray-900 title-font flex flex-row justify-between font-medium"><p>Order No:{index+1}</p><p>Amount : ₹ {order.amount}</p></h2>
            <div className='flex flex-row font-semibold justify-between'> <p className="text-gray-500">total Item : {order.products.length} </p><p>Satus : {order.status}</p></div>
          </div>
        </div>
      </div></Link>

      })} 
      
     
    
      
    
      
        
      </div>
  }
    </div>
  </section>
        
      </div>
    )

  


    }

 
    
  }

    
 

export default Orders
