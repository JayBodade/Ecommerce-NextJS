import React from 'react'
import Link from 'next/link'
import Loader from './Loader'

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
  

const ProductCard = ({product,index}:any) => {
  return (
    <Loader/>
      <Link href={`/product/${product.slug}`} onClick={} key={index} className='lg:w-1/5 lg:mb-4 lg:mx-8 lg:m-auto m-auto border  hover:scale-105 transition-all duration-300 ease-in-out border-gray-300  bg-gray-200  md:w-1/2 p-4 w-full '><div className="">
                <div className="block relative h-72 rounded overflow-hidden">
                <img alt={product.title} className="object-cover object-center w-full h-68 block bg-blend-normal"  width={200}
                  height={200} src={'/uploads/'+product.img}/>               
                   </div>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title- font mb-1">{product.category}</h3>
                  <h2 className="text-gray-900 title-font text-sm font-medium">{product.title.length > 25 ? product.title.substring(0,25)+'...':product.title}</h2>
                  <p className="mt-1">₹ {product.price}</p>
                </div>
              </div></Link>

  )
}

export default ProductCard
