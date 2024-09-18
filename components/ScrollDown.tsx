'use client'
import React from 'react';
import img from '../assets/white-down-arrow.png'
import Image from 'next/image';

const ScrollDownButton = ({ targetId }: {targetId: any}) => {
  const handleScroll = () => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      // Get the position of the target element
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;

      // Scroll to 40px before the target element
      window.scrollTo({
        top: targetPosition - 60, // Offset by 40px
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className='scroll-down' onClick={handleScroll}>
      <Image src={img} alt='' />
      <Image src={img} alt='' />
    </div>
  );
};


export default ScrollDownButton;
