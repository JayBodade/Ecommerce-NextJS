import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const Footer = () => {
  return (
   
    <div>
      
      <footer className="text-gray-600 body-font mx-auto bg-gray-200">
  <div className="container sm:px-10 lg:px-20 k lg:py-16 mx-auto  flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
    <div className="lg:w-1/4 sm:w-1/2  py-4  flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
      <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
        <Image src={'/devdealsLogo.png'} alt={"footer logo"} width={120} height={20}></Image>
        <span className="ml-3 text-xl"></span>
      </a>
      <p className="mt-2 text-sm text-gray-500">Welcome to shopIt, where shopping meets convenience, quality, and unbeatable prices. Discover a world of [tshirts , mugs , stickers , hoodies] like never before!</p>
    </div>
    <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-5 md:mb-5 mt-10 md:text-left text-center">
      <div className="lg:w-1/3 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Categories</h2>
        <nav className="list-none mb-10">
          <li>
            <Link href={'/tshirts'} className="text-gray-600 hover:text-gray-800">Tshirts</Link>
          </li>
          <li>
            <Link href={'/laptop'} className="text-gray-600 hover:text-gray-800">Laptops</Link>
          </li>
          <li>
          <Link href={'/hoodies'} className="text-gray-600 hover:text-gray-800">Hoodies</Link>
          </li>
          <li>
          <Link href={'/stickers'} className="text-gray-600 hover:text-gray-800">Stickers</Link>
          </li>
          <li>
          <Link href={'/mugs'} className="text-gray-600 hover:text-gray-800">Mugs</Link>
          </li>
        </nav>
      </div>
      <div className="lg:w-1/3 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Get to Know us</h2>
        <nav className="list-none mb-10">
          <li>
            <a className="text-gray-600 hover:text-gray-800">facebook</a>
          </li>
          <li>
            <a className="text-gray-600 hover:text-gray-800">twiter</a>
          </li>
          <li>
            <a className="text-gray-600 hover:text-gray-800">instagram</a>
          </li>
          <li>
          <Link href={'/about'}> <a className="text-gray-600 hover:text-gray-800">About Us</a></Link>
          </li>
        
        </nav>
      </div>
      <div className="lg:w-1/3 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Help</h2>
        <nav className="list-none mb-10">
          <li>
            <Link href={'/contact'} className="text-gray-600 hover:text-gray-800">Contact Us</Link>
          </li>
         
        </nav>
      </div>

    </div>
  </div>
  <div className="bg-gray-100">
    <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
      <p className="text-gray-500 text-sm text-center sm:text-left">© 2023 DevDeals —
        <a href="https://twitter.com/knyttneve" rel="noopener noreferrer"  className="text-gray-600 ml-1" target="_blank">@DevDeals</a>
      </p>
      <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
        <a className="text-gray-500">
          <svg fill="currentColor" strokeLinecap="round"   strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
          
          </svg>
        </a>
        <a className="ml-3 text-gray-500">
          <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
           
          </svg>
        </a>
        <a className="ml-3 text-gray-500">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
         
          </svg>
        </a>
        <a className="ml-3 text-gray-500">
          <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
           
          </svg>
        </a>
      </span>
    </div>
  </div>
</footer>
      
    </div>
  )
}

export default Footer
