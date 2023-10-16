import React from 'react'
import Link from 'next/link';


async function verifyUser(vid:string){

  const response = await fetch(process.env.NEXT_PUBLIC_HOSTNAME+'/api/user/verifyuser',{
    method:'GET',
    headers:{
      'content-type':'application/json',
      vid:vid,
    },
    
  });

  const result = await response.json();

  if(result.success){
    return true;
  }else{
    return false;
  }



}
const Verify = async ({params}:any) => {

  const result = await verifyUser(params.vid);

console.log(result);
  if(result){
   return <div className="min-h-screen flex items-center justify-center bg-gray-100">
   <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
     <h1 className="text-3xl font-semibold text-gray-800 mb-4">User Verified</h1>
     <p className="text-gray-600 mb-4">verification of user is successfull</p>
     <Link href="/login"
      className="text-blue-600 hover:underline">Go to Login
     </Link>
   </div>
 </div>
  
  }else{
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">Verification Failed</h1>
      <p className="text-gray-600 mb-4">Please try again</p>
      <Link href="/"
       className="text-blue-600 hover:underline">Verify Again
      </Link>
    </div>
  </div>
  )
  }
}

export default Verify
