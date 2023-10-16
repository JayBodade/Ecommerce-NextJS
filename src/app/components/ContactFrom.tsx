"use client";
import React,{useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface FormProps{

  querytitle:string;
  querydesc:string;

}


const ContactFrom = () => {

    const [formData,setFormData] = useState<FormProps>();

  const handelChange = (e:any) =>{

    const {name,value} = e.target;
    setFormData((prev:any) =>({...prev,[name]:value }))
    console.log(formData);

  }

  const submtQuery = async () =>{

    const response = await fetch(process.env.NEXT_PUBLIC_HOSTNAME+'/api/user/addcomplaint',{
      method:'POST',
      headers:{
        'content-type':'application/json',

      },
      body:JSON.stringify(formData)
    })

    const result = await  response.json();
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

    }else{
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
    

    setFormData({querydesc:'',querytitle:''});

  }
  return (
    <div>
            <section className="text-gray-600 body-font relative min-h-screen">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-12">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Contact Us</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Post your Query here we will definitely try to solve it.</p>
    </div>
    <div className="lg:w-1/2 md:w-2/3 mx-auto">
      <div className="flex flex-wrap -m-2">
        <div className="p-2 w-[500px] mx-auto ">
          <div className="relative">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Query Title</label>
            <input type="text" id="name" name="querytitle" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={handelChange}/>
          </div>
        </div>
        <div className="p-2 w-[500px] mx-auto">
          <div className="relative">
            <label htmlFor="message" className="leading-7 text-sm text-gray-600">Query Description</label>
            <textarea id="message" name="querydesc" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" onChange={handelChange}></textarea>
          </div>
        </div>
        <div className="p-2 w-full">
          <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={submtQuery}>Submit</button>
        </div>
       
      </div>
    </div>
  </div>
</section>
      
    </div>
  )
}

export default ContactFrom
