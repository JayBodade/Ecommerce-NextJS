import React from 'react'
import Link from 'next/link';

const StockRow = ({products}:any) => {
  
  if(products.length === 0){

    return <section className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto">
      <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
        <h1 className="flex-grow sm:pr-16 text-2xl text-center font-medium title-font text-gray-900">No out of stock products found </h1>
      </div>
    </div>
  </section>
  }
  else{
  return (
    <div>

<div className="salesOverview border  px-5">
  <section className="text-gray-600 body-font">
  <div className="container px-5 pt-20 pb-10 mx-auto">
    <div className="flex flex-row justify-between text-center w-full mb-20">
      <h1 className="text-2xl font-medium title-font mb-4 text-gray-900">Out of Stock Products</h1>
      <Link href={'/admin/alloutofstock'}><p>view more</p></Link>
         </div>
         <div  className="flex flex-wrap  justify-start -m-4">
    {products.map((product:any,index:number) => {
        return   <div key={index} className="p-4 lg:w-1/5 md:w-1/2 mr-9 ml-5  bg-gray-300 mb-10">
          <div className="h-full flex flex-col items-center text-center">
            <img alt="team" className="flex-shrink-0 rounded-lg w-full h-72 object-cover0 object-center mb-4" src={'/uploads/'+product.img}/>
            <div className="w-full">
              <h2 className="title-font font-medium text-lg xtext-gray-900">{product.title}</h2>
             <div className='flex flex-row justify-evenly'> <h3 className='title-font font-medium text-sm xtext-gray-900'>color:{product.color}</h3>
              <h3 className='title-font font-medium text-sm  xtext-gray-900'>size:{product.size}</h3></div>

            </div>
          </div>
        </div>
      
    })}
    </div>
   
  </div>
</section>
 
</div>
      
    </div>
  )
  }
}

export default StockRow
