"use client"
import React, { useState, useEffect, use } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useRouter } from 'next/navigation';



const Product = ({ product, allVariants, id, getProductVariants }: any) => {


  const router = useRouter();


  const [color, setColor] = useState(product[0]?.color || '');
  const [size, setSize] = useState(product[0]?.size || '');
  const [image,setImage] = useState(product[0]?.img || '') 

  const [sizeArray, setSizeArray] = useState(allVariants[color] || []);


  const handleColor = (e: any) => {
    setColor(e.target.value);
  }

  const handleSize = (e: any) => {
 
    setSize(e.target.value);

 
  }



  useEffect(() => {

    let array = id.split('-');
    size !== '' ? array[array.length - 1] = size : '';
    color !== '' ? array[array.length - 2] = color : '';
    let urI = array.join('-');

    if (color !== '' && size !== '') {
      router.push(`${process.env.NEXT_PUBLIC_HOSTNAME}/product/${urI}`);
    }


  }, [color])


  const changeImage = (e:any) =>{
    if(e.target.src){
    let arr = e.target.src.split('/')
    console.log(arr);
    let image =  arr[arr.length -1];
    setImage(image);
    }

  }






  const BuyNow = async () => {
    let added = await addToCart();
    if (added) {
      router.push('/checkout');
    }
  }




  const addToCart = async () => {

    let slugArray = product[0].slug.split('-');
    slugArray[slugArray.length - 1] = size;
    slugArray[slugArray.length - 2] = color;
    let slug = slugArray.join('-');
    const data = {
      productName: product[0].title,
      slug: slug,
      color: color,
      size: size,
      quantity: 1,
      price: product[0].price,
    }

    const token = localStorage.getItem('token');

    if (token === null) {

      toast.error(`🦄Please Login First!!`, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return false;

    }


    const headers: HeadersInit = {
      'content-type': 'application/json',
      token: token || '',
    };


    if (token === '') {
      toast.error(`🦄Please Login First!!`, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return false;

    }
    else {

      const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/cart/addtocart`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
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
        return true;
      } else {

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

        return false;
      }

    }
  }

  return (
    <div>
      <div>

        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={'/uploads/' + image} />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">{product[0].title}</h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product[0].title}</h1>

                <p className="leading-relaxed">{product[0].desc}</p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                  <div className="flex">
                  <span className="mr-2 text-xl">Color</span>
                  
                    
                  
             {Object.keys(allVariants).length > 0 ? Object.keys(allVariants).map((colorVar, index: number) => {
                       
                      if(colorVar === ''){

                        return <div>No Color</div>
                      }

                      if(colorVar === 'black'){
                        return allVariants[colorVar].includes(size) ? <button key={colorVar} disabled={!allVariants[colorVar].includes(size) ? true : false} onClick={handleColor} value={colorVar}
                            className={color === colorVar ? `border-2 mt-0.5  border-amber-400  bg-black ml-1  rounded-full w-6 h-6 focus:outline-none ` : 'border-2  border-gray-300  bg-black  ml-1  rounded-full mt-0.5 w-6 h-6 focus:outline-none'}  ></button> : <button key={index} className='border-2  border-gray-300  bg-black  ml-1  rounded-full w-6 h-6 focus:outline-none mt-0.5 opacity-60 '></button>
                      }else{

                        return allVariants[colorVar].includes(size) ? (
                          <button
                            key={colorVar}
                            disabled={!allVariants[colorVar].includes(size)}
                            onClick={handleColor}
                            value={colorVar}
                            className={
                              color === colorVar
                                ? `border-2 border-amber-400 bg-${colorVar}-600 ml-1 rounded-full w-6 h-6 focus:outline-none mt-0.5`
                                : `border-2 border-gray-300 bg-${colorVar}-600 ml-1 rounded-full w-6 h-6 mt-0.5 focus:outline-none`
                            }
                          style={{backgroundColor:`${colorVar}`}}></button>
                        ) : (
                          <button
                            key={colorVar}
                            className={`border-2 border-gray-300 mt-0.5 bg-${colorVar}-600 ml-1 rounded-full w-6 h-6 focus:outline-none opacity-60`}
                          ></button>
                        );
                      
                        
                        
                        
                        
                        

                        }
                    }):<div className='text-xl '>No Color</div> }
                  </div>
                  <div className="flex ml-6 items-center">
                    <div className="flex  p-2 rounded-lg">
                      <span className="mr-2 mt-1 text-xl">Size</span>

                      {sizeArray.length > 0 && sizeArray[0]!='' ? ( sizeArray.map((sizeVar: string, index: number) => {
                        
                          return  <button value={sizeVar} onClick={handleSize} key={index}  className={`w-9 h-9  ${size === sizeVar ?  'border border-black text-black':'border border-gray-300'} rounded-full flex items-center justify-center cursor-pointer mx-1`}>
                          {sizeVar}
                        </button>
                        })):"No Size"}
                    </div>

                    
                  </div>
                </div>
                <div className="flex flex-col md:flex-row">
                  <span className="title-font font-medium text-2xl  text-gray-900">₹ {product[0].price}</span>
                  <div className='lg:justify-evenly lg:w-3/4 lg:ml-auto lg:flex lg:flex:row'>
                    <button className="flex ml-auto  text-black bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded" onClick={BuyNow}>Buy Now</button>
                    <button className="flex ml-auto text-black bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded" onClick={addToCart}>Add To Cart</button>

                  </div>
                 
                </div>
                <div className="container w- mx-auto mt-10 flex flex-wrap  justify-evenly">

                <div className='hover:cursor-pointer' onMouseOver={changeImage} >
      <img src={'/uploads/'+product[0].img} alt="Image 1" className="border border-black mx-2 my-2 w-[120px] h-[170px] rounded-3xl"/>
    </div>

    {product[0].productImages.map((images:string,index:number)=>{
      return <div  className='hover:cursor-pointer  ' onMouseOver={changeImage} key={index}>
      <img src={'/uploads/'+images} alt="Image 1" className="border border-black my-2 mx-2 w-[130px] h-[170px] rounded-3xl"/>
    </div>
    }) }
    
              </div>
              </div>
            </div>
          </div>
          
        </section>
      </div>

    </div>
  )
}

export default Product;
