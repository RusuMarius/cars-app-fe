'use client'
import { useEffect } from 'react';

const Success = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = '/cart';
    }, 2000); // Redirect after 2 seconds
  }, []);

  return (
    <div className='success-page'>
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
    </div>
  );
};

export default Success;
