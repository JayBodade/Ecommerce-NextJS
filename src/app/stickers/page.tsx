import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import Image from 'next/image'
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

export const metadata : Metadata ={

  title:'Stickers - Shopit',
  description:'find the best stickers for coders'
  
}

async function getServerSideProps() {
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/product/getProducts`, {
    method: 'GET',
    headers:{
      'content-type':'application/json',
      category:'stickers',
    },
    next: { revalidate: 3600 },
  

  });
  const result = await response.json();

  return result.data;

}






const Stickers = async () => {
  const products: Products[] = await getServerSideProps();



  if(products.length > 0){


  return (
   <div>


      <div>
        <section className="text-gray-600 body-font min-h-screen ">
          <div className="container px-5 py-24  md:w-11/12 md:mx-auto ">
            <div className="flex flex-wrap -m-4">
              {products && products.map((product: Products, index: number) => {

                return <Link href={`/product/${product.slug}`} key={index} className='lg:w-1/5 lg:mb-4 lg:mx-8 lg:m-auto  border border-gray-300 m-auto  bg-gray-200  md:w-1/2 p-4 w-full '><div className="">
                <div className="block relative h-72 rounded overflow-hidden">
                  <Image alt={product.title} className="object-cover object-center w-full h-68 block bg-blend-normal"  width={200}
                  height={200} src={product.img}/>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title- font mb-1">{product.category}</h3>
                  <h2 className="text-gray-900 title-font text-sm font-medium">{product.title.length > 25 ? product.title.substring(0,25)+'...':product.title}</h2>
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
                <div><section className="text-gray-600 body-font min-h-screen ">
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

export default Stickers
