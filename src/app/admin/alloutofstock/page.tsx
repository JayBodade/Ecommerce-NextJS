"use client"
import React, { useState, useEffect } from 'react'
import useSWR from 'swr';
import Link from 'next/link';
import { AiOutlineUpload, AiOutlineDelete } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


async function getOutOfStockProducts(url: string) {

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    cache: 'no-store',
  });

  const result = await response.json();
  if (result.success) {

    return result.products;

  }
  else {
    return [];
  }

}


const OutOfStock = () => {
  const { data, error, isLoading } = useSWR([`${process.env.NEXT_PUBLIC_HOSTNAME}/api/product/getoutofstocks`], ([url]) => getOutOfStockProducts(url))

  const [productData, setProductData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [productId, setProductid] = useState('');


  useEffect(() => {
    // Set the product data when the data from useSWR changes
    if (data) {
      setProductData(data);
      let arr: any = [];
      ;
    }
  }, [data]);

  const deleteProduct = async (id: string) => {


    const response = await fetch(process.env.NEXT_PUBLIC_HOSTNAME+'/api/product/deleteproduct', {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        pid: id,

      }
    })

    const result = await response.json();


    if (result.success) {


      const updatedData = productData.filter((item: { _id: string; }) => item._id !== id);
      setProductData(updatedData);
      toast.success(`🦄Product Deleted`, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    }
    else {

      toast.error(`🦄Something went wrong`, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    }

  }



  useEffect(() => {



  }, [productData])

 const handleQuantityChange = (e:any) =>{

    setQuantity(e.target.value);
  }


  const updateProduct = async (e: any) => {


    console.log('clicked')
    if(productId === ''){
      setProductid(e.currentTarget.value)

    }else{

      //api call
      if(quantity === 0) 
      {
        setProductid('');
        return;
      }

      const response = await fetch(process.env.NEXT_PUBLIC_HOSTNAME+'/api/admin/updateproduct',{
        method:'PUT',
        headers:{
          'content-type':'application/json',
          productId:productId,
        },
        body:JSON.stringify({quantity}),
      })
    
      const result =await response.json();
      console.log(result);
      if(result.success){
        toast.success(`🦄${result.message}`, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });

        let olderProducts = productData;
        let updatedData = olderProducts.filter((item:{_id:string}) => item._id !== productId);
        setProductData(updatedData);

        setQuantity(0);
      }
      else{
        toast.error(`🦄${result.message}`, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
    
    }

  }





  if (error) {

    return <div>Something went wrong</div>

  }
  if(productData.length === 0){
    return  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">No Out Of Stock Prodcuts</h1>
      <p className="text-gray-600 mb-4">There is no products which is out of stock</p>
      <Link href="/admin/admindashboard"
       className="text-blue-600 hover:underline">Go Back to Dashboard
      </Link>
    </div>
  </div>
  }
  else {



    return (
      <div>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
              <h1 className="text-2xl font-medium title-font mb-4 text-gray-900">All out of stock products</h1>
            </div>

            {isLoading ? <div className=' w-[40px]  justify-center mx-auto'>
              <div role="status   ">

                <svg aria-hidden="true" className="inline w-10 h-10 mr-2 text -gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">

                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
              : <div className="flex flex-wrap -m-4">

                {productData.map((product: any, index: number) => {

                  return <div key={product._id} className="p-4 lg:w-1/5 md:w-1/2  bg-gray-300 mb-3 mx-9">
                    <div className="h-full flex flex-col items-center text-center ">
                      <img alt="team" className="flex-shrink-0 rounded-lg w-full h-80  object-cover object-center mb-4" src={'/uploads/' + product.img} />
                      <div className="w-full">
                        <h2 className="title-font font-medium text-lg text-gray-900">{product.title.substr(0,14)}</h2>
                        <div className="flex flex-row justify-evenly">
                          {product.color !== '' ?<p className="mb-4">Color : {product.color} </p>:"" }
                          {product.size !== '' ?<p className="mb-4">Size : {product.size} </p>:"" } <p className="mb-4">Quantity : {product.availableQty} </p></div>


                        <div className='flex  flex-row justify-around'>
                          <button className='w-fit h-fit border border-gray-600' value={product._id} onClick={(e: any) => updateProduct(e)}>

                            <AiOutlineUpload className='text-2xl hover:cursor-pointer' /> </button>{product._id === productId ? <input
                              type="number"
                              onChange={handleQuantityChange}
                              className="w-[135px] py-0.5 px-4 rounded-sm border border-gray-300 focus:ring focus:ring-blue-400 focus:outline-none"
                              placeholder="enter quantity"
                            /> : ''}
                          <button  className='w-fit h-fit border border-gray-600' ><AiOutlineDelete className='text-2xl hover:cursor-pointer' onClick={(e: any) => deleteProduct(product._id)} /></button>
                        </div>

                      </div>
                    </div>
                  </div>


                })}


              </div>}
          </div>
        </section>

      </div>
    )
  }
}

export default OutOfStock
