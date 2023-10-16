'use client'
import React,{useState} from 'react'
import {useRouter }from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface AdminCredProps{
    email:string,
    password:string
}

import Link from 'next/link'

const AdmiForm = () => {

    const router = useRouter();

    const [adminCred,setAdminCred] = useState<AdminCredProps>({email:'',password:''}); 
    const [loading,setLoading]=useState(false);

    const handleChange=(e:any)=>{

        const {name,value} = e.target;
      console.log(name,value);
        setAdminCred((prev) =>({...prev,[name]:value }))

    }

    const  Login = async  (e:any) =>{
        e.preventDefault();
        setLoading(true);
        let body={
          email:adminCred.email,
          password:adminCred.password,
        }
        
        const response = await fetch(process.env.NEXT_PUBLIC_HOSTNAME+'/api/admin/login',{
            method:'POST',
            headers:{

                'content-type':'application/json',
            },
            body:JSON.stringify(body),

        })

       
        const result =await  response.json();
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

          localStorage.setItem('adminToken',result.token);
            router.push('/admin/admindashboard');
          
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

        setLoading(false);
    }

  return (
    <div>
    <div>
      <section className="h-fit min-h-screen ">
       
  <div className="h-fit w-3/4 m-auto py-7 mt-7  px-2">
    
    <div
      className="g-6 flex h-full flex-wrap items-center m-auto px-2 py-2  justify-center lg:justify-between">
     

    
      <div className="mb-12 md:mb-0 md:w-8/12 lg:w-11/12 lg:m-auto md:m-auto xl:w-5/12">
        <form>
         
          <div
            className="flex flex-row items-center justify-center lg:justify-start">
            <p className="mb-0 mr-4 text-lg">Welcome Admin Please Sign in to Continue</p>

          
           

        
          
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
        <input type="text" id="password" name="password" onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
           
          </div>

          <div className="mb-6 flex items-center justify-between">
            
            <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
              <input
                className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                type="checkbox"
                value=""
                id="exampleCheck2" />
              <label
                className="inline-block pl-[0.15rem] hover:cursor-pointer"
                htmlFor="exampleCheck2">
                Remember me
              </label>
            </div>

          
            <a href="#!">Forgot password?</a>
          </div>

        
          <div className="text-center lg:text-left">
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

           
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
      
    </div>

      
    </div>
  )
}

export default AdmiForm
