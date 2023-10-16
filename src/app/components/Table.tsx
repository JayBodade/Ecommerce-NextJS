"use client";
import React, { useEffect , useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BsPlusSquare} from 'react-icons/bs';
import Link from 'next/link';
import {AiOutlineMinusSquare} from 'react-icons/ai';

interface CartProps {
    productId: string;
    userID: string;
    productName: string;
    slug: string;
    color: string;
    size: string;
    quantity: number;
    price:number;
    
  
  };

interface OrderProps{
  productId: string;
  productName: string;
  slug: string;
  color: string;
  size: string;
  quantity: number;
  price:number;

}


interface formProps{
  name:string,
  address:string,
  phone:string,
  currentCity:string,
  state:string,
  pincode:string,


}

  
const Table = ({data}:any) => {






    const [cart, setCart] = useState<CartProps[]>([]);
    const [subTotal,setSubTotal]=useState(0);
    const [price,setPrices] = useState<number[]>([]);
    const [loading,setLoading] = useState(false);
    const [token,setToken]=useState('');

  

    const getCartItems = async (token:string) =>{



      setLoading(true);
      
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/cart/getcart`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              token: token || '',
            },
            
          });

          const result = await response.json();
     
          if (result.error && result.error.message === 'jwt expired') {
            localStorage.removeItem('token');
            setCart([]);
           
          }
          else if (result.cartItems && result.cartItems.length > 0) {
    
            setCart(result.cartItems)
            let total = 0;
            let dbprice: number[]=[];
            result.cartItems.forEach((item:any)=>{
              total +=  item.price;
              dbprice.push(item.price);

            })

            setSubTotal(total);
            setPrices(dbprice);
              }
            else{
                setCart([]);
            }

            setLoading(false);
     
        }

      const getAvailableQuantity = (cart:CartProps[])=>{
        // const response = await fetch('');
        
      }


      
      
        const increaseQuantity = (index:number)=>{
          let cartArray =  [...cart];
          cartArray[index].quantity = cartArray[index].quantity + 1;
          cartArray[index].price = cartArray[index].price + price[index] ;
          setSubTotal(prev => prev + price[index]);
           setCart(cartArray);
        }

        useEffect(()=>{
         
        },[cart]);

           
    useEffect(()=>{
        let token = localStorage.getItem('token') || '';
      
        if(token!==''){
            setToken(token);
            getCartItems(token);
            getAvailableQuantity(cart)
        }  
    },[])


    const addOrder = async(body:any)=>{
  
      
      
    }

    const Pay = async ()=>{



      if(data.address==='' || data.currentCity ==='' || data.state ===''){
        toast.error(` please fill the infromations`, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
       }

      
      let products :OrderProps [] = [];
      cart.forEach((cartItem,index)=>{
        let cartData :OrderProps= {
         
          productId:cartItem.productId,
          productName:cartItem.productName,
          color:cartItem.color,
          size:cartItem.size,
          slug:cartItem.slug,
          quantity:cartItem.quantity, 
          price:cartItem.quantity * price[index],
        }
       

        products.push(cartData);
      })


      
      const body = {
        userId:cart[0].userID,
        products:products, 
        amount:subTotal,
        phone:data.phone,
        address:data.address+','+data.currentCity+','+data.state,
      }

     
const response = await fetch('http://localhost:3000/api/orders/pay',{
      method:'POST',
      headers:{
        'content-type':'application/json',
      },
      body:JSON.stringify(body),

    })

    const result = await response.json();
    const {resArray,qtyArray} = result;  
    
  console.log(result);
    



      
  if(resArray.length === 0){

   
    console.log('in if == 0');

      if(result.success) {
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

        setCart([]);
        
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
 addOrder(body);  
        

  }else{

    for(let i=0;i<resArray.length;i++){
      let message = `The Selected Quantity for Product Name ${resArray[i].productName} color ${resArray[i].color} and size ${resArray[i].size} is not available  right now available Quantity : ${qtyArray[i]} please select a proper available quantity`;
      console.log("in here");
      toast.error(`🦄${message}`, {
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


    const decreaseQuantity=(index:number)=>{
      let cartArray =  [...cart];
      if(cartArray[index].quantity == 1){
        return;
      }
      cartArray[index].quantity = cartArray[index].quantity - 1;
      cartArray[index].price = cartArray[index].price - price[index] ;
      setSubTotal(prev => prev - price[index]);
       setCart(cartArray);

    }




    if(token === ''){


      return  <div className="h-fit  my-8 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Unauthorized Access</h1>
        <p className="text-gray-600 mb-4">Please Login to See Your Cart</p>
        <Link href="/login"
         className="text-blue-600 hover:underline">Go to Login
        </Link>
      </div>
    </div>
    }
    else{

    



    
  return (
    <><ToastContainer/>
   
   
   { loading ? <div className='w-1/2 mx-auto text-center'><div
  className="inline-block mx-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
  role="status">
  <span
    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
    >Loading...</span
  >
</div></div> : cart.length >0 ? <div> <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-20">
      <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Pricing</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Empty cart, but not for long! Start shopping to fill it with your favorite products.</p>
    </div>
    <div className="lg:w-2/3 w-full mx-auto overflow-auto">
      <table className="table-auto w-full text-left whitespace-no-wrap">
        <thead>
          <tr>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Product</th>
          
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Quantity</th>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Price</th>
                   </tr>
        </thead>
        <tbody>
          

            {cart.map((item,index)=>{
                return <tr key={index}> <td className="px-4 py-3">{item.productName}{item.color !== '' ? '/('+item.color+')':''}{item.size !== '' ? '/('+item.size+')':''}</td>
                
                <td className="px-4 py-3 flex flex-row"> <button className="bg-blue-500 hover:bg-blue-600 font-semibold pb-1 rounded-sm px-1 text-black " onClick={(e)=>increaseQuantity(index)}>
  <span className="text-xl font-bold">+</span>
</button> <span className='font-bold text-lg mx-1'>{item.quantity}</span> <button className="bg-blue-500 hover:bg-blue-600 rounded-sm font-semibold pb-1 px-1 text-black" onClick={(e)=>decreaseQuantity(index)}>
  <span className="text-xl font-bold">-</span>
</button></td>
                <td className="px-4 py-3 text-lg text-gray-900">₹ {item.price}</td>
                <td className="w-10 text-center">
                
                </td></tr>
            })}
           
          
        </tbody>
      </table>
    </div>
    <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">

      <button className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded" onClick={Pay}>Pay ₹ {subTotal}</button>
    </div>
  </div>
</section>
      
      
    </div>: <> <div className="flex flex-col text-center w-full mb-20">
      <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">No Product Found</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Banh mi cornhole echo park skateboard authentic crucifix neutra tilde lyft biodiesel artisan direct trade mumblecore 3 wolf moon t  wee</p>
      
    </div></>}

    </>
  )
          }
}

export default Table
