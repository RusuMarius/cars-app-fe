// components/CarDetailsWithLocation.tsx
'use client';

import { useState, useEffect } from 'react';
import { getDealers } from '@/app/api/getData';
import { calculateDistances } from '@/utils/calculateDistances';
import MapComponent from '@/components/MapComponent';

const CarDetailsWithLocation = ({ carData }: { carData: any }) => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [dealers, setDealers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        err => {
          console.error('Geolocation error:', err.message);
          setError(err.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (location) {
      const fetchDealers = async () => {
        try {
          const dealersData = await getDealers();
          const allDealers = Array.isArray(dealersData.data) ? dealersData.data : [];
          const relevantDealers = allDealers.filter((dealer:any) =>
            carData.dealerIds.includes(dealer.id)
          );
          const sortedDealers = calculateDistances(
            location.latitude,
            location.longitude,
            relevantDealers
          ).sort((a, b) => a.distance - b.distance);
          setDealers(sortedDealers);
        } catch (fetchError) {
          console.error('Error fetching dealers:', fetchError);
          setError('Failed to fetch dealers.');
        }
      };

      fetchDealers();
    }
  }, [location, carData.dealerIds]);

  if (error) return <div>Error: {error}</div>;
  if (!location) return (
    <div className="loading-spinner">
      <div className="bars-loader"></div>
    </div>
    );

  return (
    <div className="container overflow-hidden">
      <div className="content-car my-10 w-[100%] text-center md:items-left md:text-left">
        <div className="w-full">
          <div className="flex flex-wrap sm:flex-column md:flex-row">
            <h2 className="mb-4 mt-6 w-[100%] font-bold">Find dealers near you.</h2>
            <div className="map-wrapper">
              <MapComponent dealers={dealers} userLocation={location} />
            </div>
            {dealers.length > 0 ? (
              <div className="dealers-wrapper">
              <h3 className="mb-4 font-bold">Nearest Dealers</h3>
              <ul>
                {dealers.map(dealer => (
                  <li className='dealer-item' key={dealer.id}>
                    <p className='font-bold'>{dealer.attributes.title}</p>
                    <p>{(dealer.distance / 1000).toFixed(2)} km away</p>
                  </li>
                ))}
              </ul>
            </div>
            ) : ''}

          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsWithLocation;
