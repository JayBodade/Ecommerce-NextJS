import React from 'react'
import Link from 'next/link'

const UnAuthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Unauthorized Access</h1>
        <p className="text-gray-600 mb-4">You do not have permission to access this page.</p>
        <Link href="/"
         className="text-blue-600 hover:underline">Go Back to Home
        </Link>
      </div>
    </div>
  )
}

export default UnAuthorized
