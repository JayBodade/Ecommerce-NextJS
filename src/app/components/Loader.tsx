import React from 'react'

const Loader = () => {
  return (
    <div>
        <div className="bg-white mx-auto absolute left-0 z-50 h-screen w-screen shadow-2xl rounded-lg flex items-center justify-center">
  <div className="relative flex flex-row border border-gray-300 px-10 py-10 shadow-2xl rounded-2xl bg-gray-100">
  {/* <div className="w-10 h-10 mx-2 bg-red-400 rounded-full transition-colors:bg-red-600 animate-bounce duration-500"></div>
    <div className="w-10 h-10 mx-2 bg-yellow-400 rounded-full animate-bounce duration-200"></div>
    <div className="w-10 h-10 mx-2 bg-green-400 rounded-full animate-bounce duration-300"></div> */}
    <div className="w-10 h-10 mx-2 bg-pink-400 rounded-full transition-colors:bg-pink-600 animate-bounce duration-500"></div>
    <div className="w-10 h-10 mx-2 bg-teal-400 rounded-full animate-bounce duration-200"></div>
    <div className="w-10 h-10 mx-2 bg-purple-400 rounded-full animate-bounce duration-300"></div>
    {/* <div className="w-10 h-10 mx-2 bg-gray-300 rounded-full transition-colors:bg-gray-600 animate-bounce duration-500"></div>
    <div className="w-10 h-10 mx-2 bg-blue-300 rounded-full animate-bounce duration-200"></div>
    <div className="w-10 h-10 mx-2 bg-gray-300 rounded-full animate-bounce duration-300"></div>  */}

  </div>
</div>

    </div>
  )
}

export default Loader
