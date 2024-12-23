"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Loader from '../Components/Loader';

interface CSR {
  id : number,
  title : string,
  image : string,
  price : number,
  category : string
}

function page() {

const [apiData, setApiData] = useState<CSR[]>([]);
const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fechting = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      const convertResponse:CSR[] = await response.json();
      setApiData(convertResponse);
      setLoading(false) 
    }
    fechting();
  }, [])

  if(loading){
    return (
      <>
       <div className="flex justify-center items-center h-screen">
        <Loader/>
      </div>
      </>
    )
  }

  return (
    <>       <div className='flex justify-center items-center my-6 text-2xl font-bold'>
            <p>Data Fetched Succesfully</p>
    </div>
          <div className='flex flex-wrap p-6 sm:p-10 gap-8 sm:gap-16 justify-center'>
            {
              apiData.map((item, index) => (
                <div key={index} className="w-full sm:w-[324px] rounded border-2 border-white">
              <Image src={item.image} alt="Blog 1" height={349} width={423} className='w-[350px] h-[350px] object-cover' />
              <div className="p-4 text-left">
                <p className="text-[#FF9F0D]">{item.category}</p>
                <p className="font-bold text-sm sm:text-base">
                  {item.title.slice(0,25)}
                </p>
                <div className="flex justify-between mt-6 sm:mt-16">
                  <p>PRICE : </p>
                  <p className="text-sm sm:text-base">{item.price}$</p>
                </div>
              </div>
            </div>
              ))
            }
          </div>
    </>
  )
}

export default page