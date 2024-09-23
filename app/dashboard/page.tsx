import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import React from 'react';
import { getReservationData } from '../api/getData'; // Update the path as needed
import Image from 'next/image';
import CancelReservation from '@/components/CancelReservation';

const Dashboard = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const reservations = await getReservationData(); // Fetch reservations with dealers
  const img = user?.picture;

  return (
    <div className='container'>
      <div className='flex py-5'>
        <div className='rounded-xl overflow-hidden'>
          {img ? (
            <Image src={img} alt="User profile" width={100} height={100} />
          ) : (
            <p>No profile image available</p>
          )}
        </div>
        <div className='p-2'>
          <h2>{user?.family_name} {user?.given_name}</h2>
          <p>{user?.email}</p>
        </div>
      </div>
      <h4 className='my-10'>Your Reservations</h4>
      <div className='reservations'>
        {reservations.data.length > 0 ? (
          reservations.data.map((reservation: any) => {
            console.log('Reservation:', reservation); // Log each reservation

            return (
              <div className='reservation-dashboard' key={reservation.id}>
                <p><span>{reservation.attributes.reservationDate}</span></p>
                <p>For: <span>{reservation.attributes.car.data.attributes.title}</span></p>

                {reservation.dealer?.data ? (
                  <p>Dealer: <span>{reservation.dealer.data.attributes.title}</span></p>
                ) : (
                  <p><span>No dealer assigned</span></p>
                )}
                <p>Contact: <span>0771583863</span></p>
                <CancelReservation reservation={reservation} />
              </div>
            );
          })
        ) : (
          <p>You have no reservations.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
