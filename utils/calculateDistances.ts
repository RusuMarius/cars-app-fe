
import { getDistance } from 'geolib';
import { Dealer } from '@/types';

export const calculateDistances = (userLat: number, userLon: number, dealers: Dealer[]) => {
  return dealers.map(dealer => {
    const { latitude, longitude } = dealer.attributes;
    const distance = getDistance(
      { latitude: userLat, longitude: userLon },
      { latitude, longitude }
    );
    return { ...dealer, distance };
  });
};
