"use client";
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface ProductDataProps {
  productname: string;
  productslug: string;
  productprice: number;
  productquantity: number;
  productprofileimage: string;
  productsize: string;
  productimages: [];
  productcategory: string;
  productcolor: string;
  productdesc: string,



}

const AddProduct = () => {



  const [productData, setProductData] = useState<ProductDataProps>({ productname: '', productcolor: '', productcategory: '', productquantity: 0, productprice: 0, productimages: [], productprofileimage: '', productsize: '', productslug: "", productdesc: '' });
  const [sizeArray, setSizeArray] = useState<string[]>([]);

  const router = useRouter();


  const handleChange = (e: any) => {

    const { name, value } = e.target;

    setProductData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleColorChange = (e: any) => {

    const { name, value } = e.target;

    if (value === "") {
      return;
    }

    let lowercase = productData.productname.toLowerCase();


    let slug = lowercase.replace(/[^a-zA-Z0-9 ']/g, '');
    slug = slug.replace(/'/g, "");

    slug = slug.split(' ').join('-')
    slug = slug + '-' + value
    setProductData((prev) => ({
      ...prev,
      [name]: value,
      productslug: slug,
    }))

  }


  const hanldeSizeChange = (e: any) => {

    const { value } = e.target;

    if (e.target.checked) {

      let previouSize = sizeArray;
      previouSize.push(value);

      setSizeArray(previouSize);

    } else {

      let newSizeArray = sizeArray.filter(item => item !== value);
      setSizeArray(newSizeArray);
    }

    console.log(sizeArray);

  }


  const handleNameChange = (e: any) => {

    const { name, value } = e.target;

    if (value === "") {
      return;
    }

    let lowercase = value.toLowerCase();


    let slug = lowercase.replace(/[^a-zA-Z0-9 ']/g, '');
    slug = slug.replace(/'/g, "");


    slug = slug.split(' ').join('-')
    setProductData((prev) => ({
      ...prev,
      [name]: value,
      productslug: slug,
    }))



  }

  const handleCategoryChange = (e: any) => {


    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value.toLowerCase(),
    }))


  }

  const uploadToClient = (e: any) => {


    console.log(e.target.files[0]);
    const name = e.target.name;
    const file = e.target.files[0];
    setProductData((prev) => ({
      ...prev,
      [name]: file
    }))

  }

  const addProdut = async () => {

    const formdata = new FormData();


    formdata.append('file', productData.productprofileimage);
    console.log(productData.productimages);
    for (let i = 0; i < productData.productimages.length; i++) {
      formdata.append(`file${i}`, productData.productimages[i]);
    }


    const response = await fetch(process.env.NEXT_PUBLIC_HOSTNAME+'/api/admin/upload', {
      method: 'POST',
      body: formdata
    })

    const result = await response.json();


    let filesNames = result.fileArray;
    let otherfiles = filesNames.filter((file: any, index: number) => index !== 0)
    console.log(otherfiles);


    const data = {
      title: productData.productname,
      img: filesNames[0],
      desc: productData.productdesc,
      category: productData.productcategory,
      color: productData.productcolor,
      size: '',
      productImages: otherfiles,
      slug: productData.productslug,
      price: productData.productprice,
      availableQty: productData.productquantity,
    }

    const body = {
      data: data,
      sizeArray: sizeArray,
    }

    const response2 = await fetch(process.env.NEXT_PUBLIC_HOSTNAME+'/api/admin/addproduct', {
      method: 'POST',
      body: JSON.stringify(body),
      cache: 'no-store',
    })

    const result2 = await response2.json();

    if (result2.success) {

      toast.success(`🦄product added successfully`, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setProductData({ productcategory: '', productdesc: '', productcolor: '', productname: '', productprofileimage: '', productquantity: 0, productsize: '', productimages: [], productslug: '', productprice: 0 });
    }
    else {
      toast.error(`🦄Oops something went wrong !!`, {
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

  const handleImages = (e: any) => {


    setProductData((prev) => ({
      ...prev,
      [e.target.name]: e.target.files
    }))

    console.log(productData);


  }



  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Add Product</h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm text-gray-600">Product Name</label>
                  <input type="text" id="name" name="productname" value={productData.productname} onChange={(e) => handleNameChange(e)} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="email" className="leading-7 text-sm text-gray-600">Product Slug - keep it as (Name)(Color)</label>
                  <input type="text" id="email" readOnly={false} onChange={handleChange} value={productData.productslug} name="productslug" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm text-gray-600">Product Price</label>
                  <input type="number" id="name" onChange={handleChange} name="productprice" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm text-gray-600">Product Quantity</label>
                  <input type="number" id="name" onChange={handleChange} name="productquantity" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm text-gray-600">Product Profile Image</label>
                  <input type="file" id="name" name="productprofileimage" onChange={uploadToClient} className="w-full bg-gray-100 file:rounded-md file:border-none file:bg-blue-400  bg-opacity-50 rounded border border-gray-300 file:text-white focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm text-gray-600">Product Images</label>
                  <input type="file" id="name" multiple={true} name="productimages" onChange={handleImages} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 file:bg-blue-400 file:border-none file:rounded-md placeholder: focus:border-blue-500 focus:bg-white  file:text-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm text-gray-600">Product Category</label>
                  <select name='productcategory' onClick={handleCategoryChange} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:ring-opacity-50 focus:outline-none focus:border-blue-400">
                    <option value="">Choose a Category</option>
                    <option value="tshirts">Tshirts</option>
                    <option value="laptop">Laptop</option>
                    <option value="hoodies">Hoodies</option>
                    <option value="stickers">Stickers</option>
                    <option value="mugs">Mugs</option>

                  </select>
                </div>
              </div><div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm text-gray-600">Product Color</label>
                  <select onClick={handleColorChange} className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:ring-opacity-50 focus:outline-none focus:border-blue-400' name="productcolor" id="">
                    <option value="">Choose a color</option>
                    <option value="blue">blue</option>
                    <option value="red">red</option>
                    <option value="black">black</option>
                    <option value="purple">purple</option>
                    <option value="green">green</option>
                    <option value="white">white</option>
                    <option value="brown">brown</option>

                  </select>
                </div>
              </div>
              <div className="px-4 py-2 w-1/4 ">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm text-gray-600">Product Size</label>
                  <div className="flex space-x-7 mt-2">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" onChange={hanldeSizeChange} className="form-checkbox text-blue-500" name="checkbox-option1" value="S" />
                      <span>S</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" onChange={hanldeSizeChange} className="form-checkbox text-blue-500" name="checkbox-option2" value="M" />
                      <span>M </span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" onChange={hanldeSizeChange} className="form-checkbox text-blue-500" name="checkbox-option3" value="L" />
                      <span>L </span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" onChange={hanldeSizeChange} className="form-checkbox text-blue-500" name="checkbox-option4" value="XL" />
                      <span>XL</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="message" className="leading-7 text-sm text-gray-600">Product Description</label>
                  <textarea id="message" onChange={handleChange} name="productdesc" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg" onClick={addProdut}>Button</button>
              </div>
              <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                <a className="text-blue-500">example@email.com</a>
                <p className="leading-normal my-5">49 Smith St.
                  <br />Saint Cloud, MN 56301
                </p>
                <span className="inline-flex">
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">

                    </svg>
                  </a>
                  <a className="ml-4 text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">

                    </svg>
                  </a>
                  <a className="ml-4 text-gray-500">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>

                    </svg>
                  </a>
                  <a className="ml-4 text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">

                    </svg>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default AddProduct
