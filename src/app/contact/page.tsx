
import React from 'react'
import { Metadata } from 'next'
import ContactFrom from '../components/ContactFrom'


export const metadata:Metadata ={
  title:'Contact Us'
}



const Contact = () => {

  
  return (
    <div>
  <ContactFrom/>
    </div>
  )
}

export default Contact
