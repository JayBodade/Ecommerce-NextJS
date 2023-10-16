"use client"
import React from 'react'
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const AdminNavBar = () => {


    const router = useRouter();
    
  const LogOutAdmin = async () => {

    console.log('here');

    const response = await fetch(process.env.NEXT_PUBLIC_HOSTNAME+'/api/admin/logout', {
      method: 'GET',
    })

    const result = await response.json();



    if (result.success) {

      toast.success(`🦄Log Out Success`, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      localStorage.removeItem('adminToken');

      router.push('/admin/login');

    } else {

      toast.error(`🦄Something went wrong`, {
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
  return (
    <div className="bg-gray-100 p-4 w-1/2 mx-auto my-2 shadow-md">
      <ul className="flex justify-evenly space-x-4">
      <li>
          <Link href="/admin/admindashboard" className="text-gray-800 hover:text-gray-600">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/admin/addproduct" className="text-gray-800 hover:text-gray-600">
            Add Product
          </Link>
        </li>
        <li>
          <button className="text-gray-800 hover:text-gray-600" onClick={LogOutAdmin}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default AdminNavBar
