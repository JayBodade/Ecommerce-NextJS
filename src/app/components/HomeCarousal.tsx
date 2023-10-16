"use client";
import Script from 'next/script';
// @ts-ignore
import Typed from 'typed.js';

import React, { useState, useEffect } from 'react';

const HomePage = () => {

    const spanRef = React.useRef(null);

    

    useEffect(() => {
        const typed = new Typed(spanRef.current, {
          strings: ['T-shirts','Hoodies','Laptops','Mugs','Stickers'],
          typeSpeed: 70,
          backSpeed:100,
          loop:true,
        });
    
        return () => {
          // Destroy Typed instance during cleanup to stop animation
          typed.destroy();
        };
      }, []);

   
  return (
    <div className="w-full h-fit z-0">
  <section className="hero bg-white bg-cover bg-center py-40 text-center relative" style={{ backgroundImage: "url('/your-background-image.jpg')" }}>
    <div className="container mx-auto relative z-10">
      <h2 className="text-5xl font-extrabold text-balck mb-4  auto-type">Discover Our Store</h2>
      <p className="text-2xl text-gray-700 mb-8">Find the latest products at unbeatable prices.</p>
      <a href="#" className="btn-primary inline-block px-6 py-3 text-lg bg-blue-500 hover:bg-blue-600 rounded-full text-white transition-all duration-300 ease-in-out transform hover:scale-105">Shop Now</a>
    </div>
    
     <div className="container lg:mx-auto ">
        <h1>Buy <span className='auto-type text-3xl font-semibold' ref={spanRef}></span></h1>
     </div>

  </section>
  
  
 
</div>
  );
};

export default HomePage;
