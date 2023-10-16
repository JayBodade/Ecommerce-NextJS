"use state";
import React,{Dispatch, useState,SetStateAction} from 'react'
interface formProps{
    name:string,
    address:string,
    phone:string,
    currentCity:string,
    state:string,
    pincode:string,
  
  
  }

interface fromdataProps{
  data:formProps;
  setData:Dispatch<SetStateAction<formProps>>;
}
  
  
  

const Form:React.FC<fromdataProps>=({data,setData}) => {

    const [cart,cartData] = useState([]);
  
    const hanldeChange = (e:any) =>{
      let {name , value} = e.target;
      setData((prev) => ({...prev,[name]:value}));
  
    }
  
  
  return (
    <div>
         <div className='mx-auto'>
        <div className="px-2 w-2/5 mx-auto">
        <form action="/">
          <div className="relative mb-4">
          
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Name</label>
        <input type="text" id="name" name="name" onChange={hanldeChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          <div className="relative mb-4">
        <label htmlFor="message" className="leading-7 text-sm text-gray-600">Address</label>
        <textarea id="address" name="address" onChange={hanldeChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-24 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
      </div>
      <div className="flex flex-col md:flex-row">
          <div className="relative mb-4 mx-2">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Phone</label>
        <input type="text" id="name" name="phone" onChange={hanldeChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          <div className="relative mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Current-City</label>
        <input type="text" id="name" name="currentCity" onChange={hanldeChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          </div>
          <div className="flex flex-col md:flex-row">
          <div className="relative mb-4 mx-2">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">State</label>
        <input type="text" id="name" name="state" onChange={hanldeChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          <div className="relative mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Pin-Code</label>
        <input type="text" id="name" name="pincode"onChange={hanldeChange}  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          </div>
          </form>
        </div>
       

      </div>
      
    </div>
  )
}

export default Form
