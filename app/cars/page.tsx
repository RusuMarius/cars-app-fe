import Cars from '@/components/Cars';
import ScrollDownButton from '@/components/ScrollDown';
import React from 'react'

const CarsPage = () => {
  return (
    <>
      <div className='relative'>
        <div className='video-cars'>
          <video width="100%" autoPlay loop muted>
            <source src="/videos/mercedes.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className='car-text'>
          <h1>Choose Your Car</h1>
          <p className='text-white text-center'>The newest collection is now here. You&nbsp;can choose any model you want and it will be delivered as fast as&nbsp;possible.</p>
        </div>
        <ScrollDownButton targetId="next-section" />
      </div>
      <div id='next-section' className='container mt-20'>
        <h1 className='pt-5 text-center leading-[1] mb-2 font-bold'>Welcome to our showroom!</h1>
        <h4 className='text-center mb-10 text-gray-500 lg:ml-auto lg:mr-auto lg:max-w-[900px]'>Choose your own car and enjoy the offers from our store.
        You can find here all brands, the only thing you have to do is to reserve your prefered car and you will be contacted for&nbsp;a&nbsp;meeting.</h4>
        <Cars />
      </div>
    </>
  )
}

export default CarsPage;