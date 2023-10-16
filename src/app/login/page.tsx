"use client";
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';



interface UserProps{
  email:string,
  password:string,
}




const Login = ({}) => {
  const [userCred,setUserCred] = useState<UserProps>({email:'',password:''});

 
  const router = useRouter();

  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    document.title='LogIn - ShopIt'
  },[])



  const handleChange = (e:any) =>{
    const {name,value} = e.target;
  

    setUserCred((prev) =>({...prev,[name]:value}));
    
    
  }

  const Login = async () =>{

    setLoading(true);
    console.log(process.env.MONGO_URI);
    // return
    if(userCred.email!=='' && userCred.password!==''){
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/user/login`,{
        method:'POST',
        
        headers:{
          'Content-Type':'application/json',

        },
        
        body:JSON.stringify(userCred),
      })

      const result = await response.json();
     
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

            localStorage.setItem('token',result.token);




            setTimeout(()=>{
            
              router.push('/');
            
          
            },3000)

          

      }
      else{

        toast.error(`🦄!${result.message}!!`, {
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
    
    }else{
      
      toast.error('🦄 Please fill all the infromation!', {
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

    setLoading(false);
    

  }
  return (
    <div>
      <section className="h-fit min-h-screen ">
        <ToastContainer/>
  <div className="h-fit w-3/4 m-auto py-7 mt-7  px-2">
    
    <div
      className="g-6 flex h-full flex-wrap items-center m-auto px-2 py-2  justify-center lg:justify-between">
     

    
      <div className="mb-12 md:mb-0 md:w-8/12 lg:w-2/3 lg:m-auto md:m-auto xl:w-5/12">
        <form>
         
          <div
            className="flex flex-row items-center justify-center lg:justify-start">
            <p className="mb-0 mr-4 text-lg">SignIn in DevDeals</p>
          </div>

          <div
            className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p
              className="mx-4 mb-0 text-center font-semibold dark:text-white">
              Or
            </p>
          </div>

         
          <div className="relative mb-6 md:pr-4" data-te-input-wrapper-init>
          <div className="relative mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
        <input type="text" id="emai" name="email" onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          </div>

        
          <div className="relative mb-6 md:pr-4" data-te-input-wrapper-init>
          <div className="relative mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Password</label>
        <input type="password" id="password" name="password" onChange={handleChange} className="w-full bg-white rounded border  border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
           
          </div>

        
        
          <div className="text-center lg:text-left justify-between "  >
            <div className="flex flex-row justify-between">
            <button
              type="button"
              className="inline-block rounded bg-blue-500 bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              data-te-ripple-init
              onClick={Login}
              >
                  
              {loading ?  <div className="flex items-center justify-center ">
    <div className="w-6 h-6 border-t-4 border-black border-solid rounded-full animate-spin"></div>
  </div> : 'Login' }
            
            </button>
            <Link href={'/forgotpassword'}>Forgot password?</Link> 
            </div>

            <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
              Don't have an account?
              <Link
                href={'/signup'}
                className="text-danger text-blue-500 transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                >Register</Link
              >
               
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
      
    </div>
  )
}

export default Login
