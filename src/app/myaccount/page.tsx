"use client";
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface formProps {
  username: string,
  address: string,
  phone: string,
  currentCity: string,
  state: string,
  pinCode: string,


}


const fetchUser = async (url: string, token: string) => {

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      token: token,
    }
  });

  const result = await response.json();

  if (result.success) {
 
    return result.userData;
  }
  else {
    return {};
  }

}


const MyAccount = () => {

  const [token, setToken] = useState('');
  const router = useRouter();
  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);
    }
    
  }, []);





  const { data, error, isLoading } = useSWR([process.env.NEXT_PUBLIC_HOSTNAME+'/api/user/getuser', token], ([url, token]) => fetchUser(url, token))


  const [userdata, setData] = useState<formProps>({
    username: '',
    address: '',
    phone: '',
    currentCity: '',
    state: '',
    pinCode: '',
  });

  useEffect(() => {
    if (data) {
      setData(data)
    }
  }, [data])

  const updateUserData = async (e:any) => {

    e.preventDefault();

      const body = {
        username: userdata.username,
        address: userdata.address + '/' + userdata.currentCity + '/' + userdata.state,
        pinCode: userdata.pinCode,
        phone: userdata.phone,
      }



      if(!localStorage.getItem('token')){
        router.push('/login');
        return ;

      }
      

      const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/user/updateuser`, {
        method: "PUT",
        headers: {
          'content-type': 'application/json',
          token: token,
        },
        body: JSON.stringify(body)
      });

      const result = await response.json();

    
      if(result.success){

        toast.success(`🦄${'Details updated successfully'}`, {
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
        toast.error(`🦄!${'someting went wrong'}!!`, {
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



  const handleChange = (e: any) => {
    let { name, value } = e.target;
   
    setData((prev) => ({ ...prev, [name]: value }));
   

  }


  if (error) {
    return <div>Something went wrong</div>
  }
  else if (isLoading) {

    return <div className="flex items-center justify-center min-h-screen">
    <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
  </div>

  }
  else {


    return (
      <div>
        <div>
          <div className='mx-auto py-10 min-h-screen'>

            <div className="px-2 md:w-3/5 lg:w-3/5 xl:w-2/5 mx-auto 320:w-11/12">
              <div className='text-center text-2xl'><h2 className='mx-auto '>Update Account</h2></div>
              <form action="/">
                <div className="relative mb-4 ">

                  <label htmlFor="email" className="leading-7 text-sm text-gray-600">Name</label>
                  <input type="text" id="username" value={userdata.username} name="username" onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
                <div className="relative mb-4">
                  <label htmlFor="message" className="leading-7 text-sm text-gray-600">Address</label>
                  <textarea id="address" name="address" value={userdata.address !== '' ? userdata.address.split('/')[0] : userdata.address} onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-24 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" placeholder={userdata.address.split('/')[0] === '' ? 'please enter your address' : ''}></textarea>
                </div>
                <div className="flex flex-col md:flex-row">
                  <div className="relative mb-4 mx-2 lg:w-1/2">
                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">Phone</label>
                    <input type="text" id="name" name="phone" value={userdata.phone} onChange={handleChange} className="w-full bg-white 
            rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 
            ease-in-out" placeholder={userdata.phone === '' ? 'please enter your phone number' : ''}/>
                  </div>
                  <div className="relative mb-4  lg:w-1/2">
                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">Current-City</label>
                    <input type="text" id="name" name="currentCity" value={userdata.address.split('/')[1]} onChange={handleChange} 
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2
                     focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 
                     ease-in-out" placeholder={userdata.address.split('/')[1] === undefined ? 'please enter your city' : ''}  />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row">
                  <div className="relative mb-4 mx-2  lg:w-1/2">
                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">State</label>
                    <input type="text" id="name" name="state" value={userdata.address.split('/')[2]} onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder={userdata.address.split('/')[1] === undefined ? 'please enter your state' : ''}  />
                  </div>
                  <div className="relative mb-4  lg:w-1/2">
                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">Pin-Code</label>
                    <input type="text" id="name" name="pinCode" onChange={handleChange} value={userdata.pinCode} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder={userdata.pinCode === '' ? "please enter your pin code ":''}/>
                  </div>
                </div>
                <button className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded" onClick={(e) => updateUserData(e)}>Update</button>

              </form>
            </div>


          </div>

        </div>

      </div>
    )

  }









}

export default MyAccount
