import React from 'react';
import CarsList from './CarsList';
import { getCars } from '@/app/api/getData';

const Cars = async () => {
  const cars = await getCars(1);

  if (!cars || !cars.meta || !cars.meta.pagination) {
    return <div>No cars available or failed to fetch pagination data.</div>;
  }

  return (
    <div>
      <CarsList initialCars={cars} totalCars={cars.meta.pagination.total} />
    </div>
  );
};

export default Cars;