import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import React from 'react';
import { getUserReservationData } from '../api/getData';
import Image from 'next/image';
import CancelReservation from '@/components/CancelReservation';

const Dashboard = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const reservations = await getUserReservationData(user?.email);

  return (
    <div className='container'>
      <div className='flex py-5 items-center'>
        <div className='rounded-xl overflow-hidden'>
          {user?.picture ? (
            <Image src={user.picture} alt="User profile" width={100} height={100} />
          ) : (
            <p>No profile image available</p>
          )}
        </div>
        <div className='p-2'>
          <h2>{user?.family_name} {user?.given_name}</h2>
          <p className='text-base'>{user?.email}</p>
        </div>
      </div>
      <h3 className='my-10 font-bold'>Your Reservations</h3>
      <div className='reservations'>
        {reservations.data.length > 0 ? (
          reservations.data.map((reservation: any) => {

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
