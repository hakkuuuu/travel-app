"use client";
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Button from './Button'

const Hero = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    if (isLoggedIn) {
      setUsername(localStorage.getItem('username') || "");
    } else {
      setUsername("");
    }
  }, []);

  return (
    <section className='max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row'>

      <div className='relative z-20 flex flex-1 flex-col xl:w-1/2'>
        {username ? (
          <h2 className='text-lg text-green-700 mb-2'>Hello, {username}! 👋</h2>
        ) : (
          <h2 className='text-lg text-green-700 mb-2'>Welcome, Guest!</h2>
        )}

        <h1 className='bold-52 lg:bold-88'>Islang Pantropiko Camp Area</h1>
        <p className='regular-16 mt-6 text-gray-50 xl:max-w-[520px]'>From following your footprints in the sand to walking with you on this island, guided by the grip of your hand I can feel you're holding my world</p>

        <div className='my-12 flex flex-wrap gap-5'>
          <div className='flex items-center gap-2'>
            {Array(5).fill(1).map((_, index) => (
              <div key={index}>
                <Image
                  src='/star.svg'
                  alt='star'
                  width={24}
                  height={24}
                  />
              </div>
            ))}
          </div>

          <p className='bold-16 lg:bold-20 text-blue-70'>198k
            <span className='regular-16 lg:regular-20 ml-2'>Excellent Reviews</span>
          </p>
          
          {/* BUTTONS */}

          <div className='flex flex-col w-full gap-3 sm:flex-row'>
            <Button 
            type='button' 
            title='Download App' 
            variant='btn_green'/>

            <Button 
            type='button' 
            title='How we work?' 
            icon='/play.svg'
            variant='btn_white_text'/>

          </div>
        </div>

        {/* CONTAINER
        <div className='relative flex flex-1 items-start'>
            <div className='relative z-20 flex w-[268px] flex-col gap-8 rounded-3xl bg-green-90 px-7 py-8'>

              <div className='flex flex-col'>
                <div className='flexBetween'>
                  <p className='regular-16 text-gray-20'>Location</p>
                  <Image src='/close.svg' alt='close' width={24} height={24}/>
                </div>
                <p className='bold-20 block text-white'>Legazpi, Albay</p>
              </div>

                <div className='flexBetween'>
                  <div className='flex flex-col'>
                    <p className='regular-16 block text-gray-20'>Distance</p>
                    <p className='bold-20 block text-white'>24.5 km</p>
                  </div>
                  <div className='flex flex-col'>
                    <p className='regular-16 block text-gray-20'>Elevation</p>
                    <p className='bold-20 block text-white'>2.002 km</p>
                  </div>
                </div>
            </div>
        </div> */}
      
      </div>
    </section>
  )
}

export default Hero