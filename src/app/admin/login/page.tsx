
import React, { useState } from 'react'
import { Metadata } from 'next';
import AdmiForm from '@/app/components/AdmiForm';

export const metadata:Metadata ={
    title:'Admin Login',
    

}
const AdminLogin = () => {

 

  return (
   <>
  <AdmiForm/>
    </>
  )
}

export default AdminLogin
