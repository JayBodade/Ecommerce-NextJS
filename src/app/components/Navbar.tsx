"use client"
import React, { useRef, useState, useEffect, SetStateAction, Dispatch } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BsFillCartCheckFill } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import { MdAccountCircle } from 'react-icons/md';
import LoadingBar from 'react-top-loading-bar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';


interface NavbarProps {
  progress: number,
  setProgress: Dispatch<SetStateAction<number>>,
  setLinkClick: Dispatch<SetStateAction<boolean>>;
  token: string,
  setToken: Dispatch<SetStateAction<string>>;
  setRounting:Dispatch<SetStateAction<boolean>>;

}

interface CartProps {
  productId: string;
  userID: string;
  productName: string;
  slug: string;
  color: string;
  size: string;
  quantity: number;


};

const Navbar = ({ progress, setProgress, setLinkClick,setRounting, token, setToken }: NavbarProps) => {

  const sideref = useRef<HTMLDivElement | null>(null);;
  const path = usePathname()
  const [pathName, setPathName] = useState(path);
  const popref = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const [isPopUpVisible, setPopUpVisible] = useState(false);


  const [loading, setLoading] = useState(false);


  const [cart, setCart] = useState<CartProps[]>([]);
  

  const toggleCart = async () => {

    console.log('here');
    if (pathName === '/checkout') {
      return;
    }

    setLoading(true);
    if (sideref.current) {
      const classArray = sideref.current.classList;
      console.log(classArray);
      if (classArray.contains('hidden')) {
        classArray.remove('hidden');
        classArray.add('visible');


        const token = localStorage.getItem('token') || '';
        if (token === '') {

        }
        else {
          const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/cart/getcart`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              token: localStorage.getItem('token') || '',
            },
            cache: 'no-store',
          });

          const result = await response.json();

          if (result.error && result.error.message === 'jwt expired') {
            localStorage.removeItem('token');
            router.push('/login')

          }
          else if (result.cartItems && result.cartItems.length > 0) {
            setCart(result.cartItems)


          }

        }
      }
      else {
        classArray.add('hidden');
        classArray.remove('visible');
      }
    }

    setLoading(false);
  }





  const logout = async () => {

    setProgress(30);


    console.log(process.env);
    console.log(process.env.MONGO_URI);

    const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/user/logout`, {
      method: 'GET',

    });

    setProgress(70);

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

      setToken('');
      localStorage.removeItem('token');

      if (pathName.split('/')[1] === 'order' || pathName === '/orders') {
        router.push('/login');
      }



    }
    else {

      toast.error(`🦄!${result.error}!!`, {
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

    setProgress(100);



  }




  const popUpController = () => {

    if (isPopUpVisible) {
      setPopUpVisible(false);
    }
    else {
      setPopUpVisible(true);
    }

  }



  const clearCart = async () => {


    const token = localStorage.getItem('token') || '';

    if (token !== '') {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/cart/clearcart`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          token: token,
        }
      });

      const result = await response.json();


      if (result.success) {
        setCart([]);
      }

    }

  }

  useEffect(() => {

  }, [cart]);

  const Loading = (e:any)=>{
    console.log(e.currentTarget.href);
    const routearray = e.currentTarget.href.split('/');
    const str = routearray[routearray.length -1];
    console.log(str,pathName)

    if('/'+str !== path){
      setRounting(true);
    }
    
    
  }

 










  return (
    <>
    <div className='320:overflow-x-hidden md:overflow-x-hidden lg:overflow-x-hidden 425:overflow-x-hidden '>
      <div key={pathName} className='lg:sticky lg:overflow-x-hidden md:overflow-x-hidden  md:sticky top-0 bg-opacity-90 z-0 bg-gray-200 p-4" lg:w-full md:w-full' >

        <header className={`text-gray-600 static   lg:overflow-y-hidden md:overflow-y-hidden body-font shadow-xl md:w-full sm:w-full 425:w-full lg:w-full`}>
          {/* //${sideBar && 'overflow-hidden'}  */}
          <ToastContainer />
          <div className={`container mx-auto flex flex-wrap p-5 flex-col    md:flex-row items-center`}>
            <Link href={'/'} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <Image src="/devdealsLogo.png" alt='main-image' className='' width={100} height={10}></Image>
              <span className="ml-3 text-xl"></span>
            </Link>


            <nav className="md:ml-auto 320:flex-row  md:mr-2 lg:mr-20 md:text-sm  lg:text-lg  xl:text-lg 425:flex-row 425:text-xs flex flex-wrap items-center text-base justify-center text-black font-bold 320:text-xs">
              <Link href={'/tshirts'}  className="mr-10 lg:mr-5 lg:text-sm md:mr-4 425:mr-2  320:mr-1.5 hover:text-gray-900" onClick={(e:any)=>{Loading(e)}}>Tshirts</Link>
              <Link href={'/laptop'} className="mr-10 lg:mr-5  lg:text-sm md:mr-4 425:mr-2 320:mr-1.5
               hover:text-gray-900" onClick={(e:any)=>{Loading(e)}}>Laptops</Link>

              <Link href={'/hoodies'}  onClick={(e:any)=>{Loading(e)}} className="mr-10 lg:mr-5  lg:text-sm 320:mr-1.5 md:mr-4 425:mr-2 hover:text-gray-900" >Hoodies</Link>
              <Link href={'/stickers'} onClick={(e:any)=>{Loading(e)}} className="mr-10 320:mr-4 lg:text-sm  lg:mr-5 md:mr-4 425:mr-2 hover:text-gray-900" >Stickers</Link>
              <Link href={'/mugs'}  onClick={(e:any)=>{Loading(e)}} className="mr-10 320:mr-1.5 lg:text-sm lg:mr-5 hover:text-gray-900" >Mugs</Link>

            </nav>

          

       <div className='flex flex-row '>
              <span className='m-auto mt-5 md:mt-1 mr-3 hover:cursor-pointer'  > {token !== '' ? <span onMouseOver={popUpController}> <MdAccountCircle className="text-3xl" /></span>
                : <Link href={'/login'}  onClick={(e)=>{Loading(e)}} ><button className='rounded bg-blue-500 bg-primary px-5 pb-1 pt-1 text-sm text-black font-medium ' value={'login'}>Login</button></Link>}</span>
              <button className="inline-flex   py-1 px-3 focus:outline-none  rounded  mt-4 md:mt-0 text-3xl" onClick={toggleCart}><BsFillCartCheckFill />
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                
                </svg>
              </button>
            </div>
          </div>
        </header>
      </div>


      <div id="popup" className={`w-full md:w-80 h-fit absolute hidden md:overflow-x-hidden  md:h-fit z-50  md:absolute side opacity-100 top-0 right-0  bg-blue-300 py-10 px-2  min-h-screen  `} ref={sideref}>
        {/* ${sideBar ? 'right-0' : '-right-96'} */}
        <h2 className='font-bold text-lg items-center text-center'>Shopping cart</h2>
        <span className='top-0 right-0 absolute text-xl ' onClick={toggleCart}><AiFillCloseCircle /></span>
        {token !== '' ? <><ul className='px-4 scroll-smooth overflow-y-scroll  max-h-96 '>
          {loading ? <div role="status">
            <svg aria-hidden="true" className="inline w-10 h-10 mr-2 text -gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">

            </svg>
            <span className="sr-only">Loading...</span>
          </div> : cart.length > 0 ? (cart.map((cartItem, index) => {
            return <li key={index} className='px-3 flex font-semibold  w-full my-4 md:my-5'><div className='mr-1 w-full text-sm md:text-base'>{index + 1}. {cartItem.productName}{cartItem.color !== '' ? '/(' + cartItem.color + ')' : ''}{cartItem.size !== '' ? '/(' + cartItem.size + ')' : ''}</div>
            </li>
          })) : <div className='px-2  mt-2 pt-2 w-1/2 mx-auto font-semibold'>Cart Is Empty</div>}

        </ul> <Link href={'/checkout'}><button className="flex mx-auto mt-10 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-sm"  >Checkout</button></Link>
          <button className="flex mx-auto mt-2 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-sm" onClick={clearCart}>Clear cart</button>
        </> : <span className='px-2  mt-2 pt-2 w-1/2 mx-auto font-semibold min-h-screen '>Please Login to see your cart Items</span>}
      </div>
      </div>


      <div ref={popref} className={`w-fit h-fit  z-50 absolute opacity-100 ${isPopUpVisible ? 'visible' : 'hidden'} border border-black`} onMouseLeave={popUpController}  style={{ right: '11%', top:'2%' }}>
              <div className="absolute w-28 mr-2 font-semibold text-black shadow-lg  rounded-md bg-blue-500 h-fit text-center"  >
                <ul className='' >
                  <Link href={'/myaccount'}><li className='mx-auto px-2.5 py-1.5  '>Account</li></Link>
                  <li className='mx-auto  py-1.5 px-2.5 '><button className='text-black' onClick={logout}>LogOut</button></li>
                  <Link href={'/orders'}><li className='mx-auto   py-1.5 px-2.5'>Orders</li></Link>
                </ul>
              </div>
            </div>
    </>



  )
}

export default Navbar
