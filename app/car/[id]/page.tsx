import dynamic from 'next/dynamic';
import { getCarData, getReservationData, mainUrl } from '@/app/api/getData';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import CarDetailsComponent from '@/components/CarDetailsComponent';
import Reservation from '@/components/Reservation';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

const CarDetailsWithLocation = dynamic(() => import('@/components/CarDetailsWithLocation'), { ssr: false });

const CarDetails = async ({ params }: { params: { id: string } }) => {
  const car = await getCarData(params.id);
  const reservations = await getReservationData();
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const userData = await getUser();

  const carData = {
    title: car.data.attributes.title,
    description: car.data.attributes.description,
    imageUrl: car.data.attributes.imageUrl,
    price: car.data.attributes.price,
    dealerIds: car.data.attributes.dealers.data.map((dealer: any) => dealer.id),
  };


  return (
    <>
      <div className='container'>
        <Link className='my-10 inline-table' href='/cars'>
          <Button>Back to cars</Button>
        </Link>
      </div>
      <CarDetailsComponent carData={carData} />
      {carData.dealerIds.length > 0 && (
        <Reservation
          reservations={reservations}
          carId={car.data.id}
          isUserAuthenticated={isUserAuthenticated}
          userData={userData}
        />
      )}
      <CarDetailsWithLocation carData={carData} />
    </>
  );
}

export default CarDetails;
