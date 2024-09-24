// components/CarsList.tsx
'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { getCars, mainUrl } from '@/app/api/getData';
import { Button } from './ui/button';

const CarsList = ({ initialCars, totalCars }: { initialCars: any; totalCars: number }) => {
  const [carItems, setCarItems] = useState(initialCars.data);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(carItems.length < totalCars);
  const [loading, setLoading] = useState(false);

  const loadMoreCars = async () => {
    setLoading(true);
    const nextPage = page + 1;
    const newCars = await getCars(nextPage);

    if (!newCars || !newCars.data) {
      setLoading(false);
      return;
    }

    setCarItems((prevCars: any) => [...prevCars, ...newCars.data]);
    setPage(nextPage);
    setHasMore(carItems.length + newCars.data.length < totalCars);
    setLoading(false);
  };
  return (
    <div className='flex flex-wrap mb-20'>
      {carItems.map((carItem: any) => {
        const imageURL = `${mainUrl}${carItem.attributes.image.data[0].attributes.url}`;
        return (
          <div key={carItem.id} className='md:w-[50%] lg:w-[33.3%] p-4 text-center relative hover:shadow-xl transition-shadow'>

            {!carItem.attributes.dealers.data.length && (
              <div className='not-available-flag absolute bg-red-600 text-white px-2 py-1 text-xs font-bold'>
                Not Available
              </div>
            )}
            <div className='car-teaser-img mb-3 lg:h-[226px] md:h-[200px] flex justify-center items-end'>
              <Link href={`/car/${carItem.id}`}>
                <img className='w-[90%]' src={carItem.attributes.imageUrl} alt={carItem.attributes.title} />
              </Link>
            </div>
            <div>
              <h3>{carItem.attributes.title}</h3>
              <p className='teaser-description text-gray-500'>{carItem.attributes.description}</p>
            </div>
          </div>
        )
      })}
      {hasMore && (
        <div className='w-full text-center my-6'>
          <Button
            onClick={loadMoreCars}
            disabled={loading}
            className='px-4 py-2'
          >
            {loading ? 'Loading...' : 'Show More'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CarsList;
