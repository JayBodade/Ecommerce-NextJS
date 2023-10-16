import Image from 'next/image'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomeCarousel from './components/HomeCarousal';
import Link from 'next/link';


export default async function Home() {
  return (
<>
      <main className="w-full h-fit  ">
      <HomeCarousel/>
      

      {/* <div className="bg-blue-100 p-4">
   
    <div className="container mx-auto">
   
      <div className="flex justify-between mb-4">
       
        <div className="text-xl font-bold">Orders</div>
        <div className="text-xl font-bold">Logout</div>
      </div>
    
      <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="text-xl font-bold">Account</div>
      
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md mt-4">
      <div className="text-xl font-bold">Account</div>
        
      </div>
    </div>
  </div> */}
      </main>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Start your shopping now</h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Embark on your shopping journey today and discover endless options to fulfill your desires and needs, all just a click away.</p>
          </div>
          <div className="flex lg:flex-row  md:flex-row flex-wrap 320:flex-col justify-evenly -m-4">
  <Link href={'/tshirts'}><div className="w-full hover:scale-105 transition-all duration-300 ease-in-out   320:w-[200px] 320:mx-auto sm:w-1/2 md:w-[320px] lg:w-[400px] rounded overflow-hidden mb-5 shadow-lg">
    <Image className="w-full h-56 sm:h-64 md:h-[400px]  lg:h-[500px]" width={200} height={200} quality={100} src="/tshirtshome.jpg" alt="T-shirts"/>
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2 text-center">T-shirts</div>
    </div>
  </div></Link>
  <Link href={'/hoodies'}><div className="w-full hover:scale-105 transition-all duration-300 ease-in-out 320:w-[200px] 320:mx-auto sm:w-1/2 md:w-[320px]  lg:w-[400px] rounded overflow-hidden mb-5 shadow-lg">
    <Image className="w-full h-56 sm:h-64 md:h-[400px] lg:h-[500px]"width={200} height={200} quality={100} src="/hoodiehome2.jpg" alt="Hoodies"/>
    <div className="px-6 py-4">
      <div className="font-bold text-xl text-center mb-2">Hoodies</div>
    </div>
  </div></Link>
  <Link href={'/laptop'}><div className="w-full hover:scale-105 transition-all duration-300 ease-in-out 320:w-[200px] 320:mx-auto sm:w-1/2 md:w-[320px]  lg:w-[400px]  rounded overflow-hidden mb-5 shadow-lg">
    <Image className="w-full h-56 sm:h-64  md:h-[400px] lg:h-[500px]" width={200} height={200} quality={100} src="/lapotphome.jpg" alt="Laptops"/>
    <div className="px-6 py-4">
      <div className="font-bold text-xl text-center mb-2">Laptops</div>
    </div>
  </div></Link>
  <Link href={'/mugs'}><div className="w-full hover:scale-105 transition-all duration-300 ease-in-out 320:w-[200px] 320:mx-auto sm:w-1/2 md:w-[320px] lg:w-[400px] rounded overflow-hidden mb-5 shadow-lg">
    <Image className="w-full h-56 sm:h-64  md:h-[400px] lg:h-[500px]" width={200} height={200} quality={100} src="/cuphome3.jpg" alt="Laptops"/>
    <div className="px-6 py-4">
      <div className="font-bold text-xl text-center mb-2">Mugs</div>
    </div>
  </div></Link>
  <Link href={'/stickers'}><div className="w-full  hover:scale-105 transition-all duration-300 ease-in-out 320:w-[200px] 320:mx-auto  sm:w-1/2 md:w-[320px] lg:w-[400px] rounded overflow-hidden mb-5 shadow-lg">
    <Image className="w-full h-56 sm:h-64  md:h-[400px] lg:h-[500px]"width={200} height={200} quality={100} src="/stickershome.jpg" alt="Laptops"/>
    <div className="px-6 py-4">
      <div className="font-bold text-xl text-center mb-2">Stickers</div>
    </div>
  </div>
  </Link>
          </div>
          
        </div>
      </section>

    </>
  )
}
