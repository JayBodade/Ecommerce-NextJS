
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head'


import Main from './components/main'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ShopIt',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
  
      <body className={` sm:overflow-x-hidden 425:overflow-x-hidden lg:overflow-x-hidden md:overflow-x-hidden` }><Main className='overflow-x-hidden' children={children}></Main></body>
     </html>
  )
}