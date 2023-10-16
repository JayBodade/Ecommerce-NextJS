"use client"
import React,{useEffect, useState} from 'react'
import Table from '../components/Table';
import Form from '../components/Form';


interface formProps{
  name:string,
  address:string,
  phone:string,
  currentCity:string,
  state:string,
  pincode:string,

}




const Checkout = () => {

  
const [data,setData] = useState<formProps>({name:'',address:'',currentCity:'',state:'',phone:'',pincode:''});
  
useEffect(()=>{

  document.title="CheckOut";

},[])

  
  return (
    <div className='container m-auto'>
      <h1 className='font-bold text-3xl my-8 text-center'>CheckOut</h1>
      <h2 className='text-center'>Delivery Details</h2>
      <Form  data={data} setData={setData}/>
      <Table data={data}/>
    </div>
  )
}

export default Checkout
