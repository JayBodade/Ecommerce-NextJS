import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { Metadata } from 'next';
import Loader from '../components/Loader';
import Product from '@/model/product';
import ProductCard from '../components/ProductCard';
interface Products {
  title: string,
  slug: string,
  desc: string,
  img: string,
  category: string,
  size: string,
  color: string,
  price: number,
  availableQty: number,

}

async function getServerSideProps() {

  const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/product/getProducts`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      category: 'tshirts',
    },
    next: { revalidate: 10 }

  });
  const result = await response.json();
  
  if(result.success){
    return result.data;
  }
  else{
    return [];
  }
 
 

}




export const metadata : Metadata ={

  title:'Tshirts - Shopit',
  description:'find the best tshirts for coders'
  
} 

const Tshirts = async () => {


  const products: Products[] = await getServerSideProps();


  if(products.length ){

  return (
    <div>
      <div className='  '>
        <section className="text-gray-600 body-font  min-h-screen  ">
          <div className="container px-5 py-24  md:w-11/12 md:mx-auto ">
            <div className="flex flex-wrap -m-2 ">
              {products && products.map((product: Products, index: number) => {

                const sizeArray = product.size.split(',');
                const colorArray = product.color.split(',');
                return <Link href={`http://localhost:3000/product/${product.slug}`} key={index} className='lg:w-1/4 lg:mb-4 xl:w-1/5 hover:scale-105 transition-all duration-300 ease-in-out  lg:mx-8 border border-gray-100 lg:m-auto m-auto bg-gray-100   md:w-1/2 p-4 w-full lg:mr-4 '><div className="">
                  <div className="block relative h-72 rounded overflow-hidden ">
                    <Image  alt={product.title} className="object-cover object-center   w-full h-68 block bg-blend-normal" width={200} height={200} src={'/uploads/'+product.img} />
                  </div>
                  {colorArray.length > 1 ?<div className="color -mb-1 flex flex-row justify-evenly h-fit m-auto w-3/4">
                    {colorArray.map((color, index:number) => {
                      if(color === 'black'){
                        return <span key={index} className='rounded-full w-6 h-6  border bg-black border-gray-600 shadow-sm'></span>
                      }
                      else if(color === 'white'){

                        return <span key={index} className='rounded-full w-6 h-6  border bg-white shadow-sm'></span>

                      }
                      else{

                    return <span key={index} className={`rounded-full w-6 h-6  border bg-${color}-500 border-gray-600 `} ></span>
                      }
                   

                    })}
                  </div>:<div className='w-28 h-5'></div>}
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title- font mb-1">{product.category}</h3>
                    <h2 className="text-gray-900 title-font text-sm font-medium">{product.title.length > 25 ? product.title.substring(0, 25) + '...' : product.title}</h2>
                    <div className="size w-fit   h-fit">{sizeArray.map((size, index) => {
                      return <span key={index} className='border rounded-sm px-1 mx-1 border-gray-500'>{size}</span>
                    })}
                      </div>
                    <p className="mt-1">₹ {product.price}</p>
                  </div>
                </div></Link>
              })}
            </div>
            
          </div>
        
        </section>
      </div>
    </div>
  )
  }else{

    return (
      <div><section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-center text-center mx-auto">
          <h1 className="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">Oops No Product Available right please come later !!!</h1>
     
        </div>
      </div>
     </section>
     </div>
       )
  }

  
}


export default Tshirts
