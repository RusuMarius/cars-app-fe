import { getProducts, getShoes } from '@/app/api/getData';
import React from 'react'
import PopularCarousel from './PopularCarousel';

const PopularProducts = async () => {

  const products = await getProducts();
  const shoes = await getShoes()

  return (
    <div>
      <PopularCarousel products={products} shoes={shoes} />
    </div>
  )
}

export default PopularProducts