'use client';

import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { format, isPast } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import Link from 'next/link';
import AlertMessage from './AlertMessage';
import Modal from './Modal';
import { useRouter } from 'next/navigation';
import { getDealers, getCarData, getReservationData } from '@/app/api/getData';

const postData = async (url: string, data: object) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data),
  }
  try {
    console.log("Sending data:", data);
    const res = await fetch(url, options)
    if (!res.ok) {
      console.error(`HTTP error! status: ${res.status}`);
      const errorResponse = await res.json();
      console.error("Full error response:", errorResponse);
      return null;
    }
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Network or other error:", error);
    return null;
  }
}

interface AddToCartProps {
  reservations: any;
  carId: string;
  isUserAuthenticated: boolean;
  userData: any;
}

const Reservation: React.FC<Readonly<AddToCartProps>> = ({ reservations, carId, isUserAuthenticated, userData }) => {
  const [date, setDate] = React.useState<Date>();
  const [alertMessage, setAlertMessage] = useState<{message: string; type: 'error' | 'success' | null;} | null>(null);
  const [dealers, setDealers] = useState<any[]>([]);
  const [filteredDealers, setFilteredDealers] = useState<any[]>([]);
  const [selectedDealer, setSelectedDealer] = useState<string | null>(null);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const formatDateForStrapi = (date: Date) => format(date, 'yyyy-MM-dd');

  useEffect(() => {
    const fetchDealersAndCarData = async () => {
      try {
        const carData = await getCarData(carId);
        const assignedDealerIds = carData.data.attributes.dealers.data.map((dealer: any) => dealer.id);

        const dealerData = await getDealers();
        setDealers(dealerData.data);

        const filtered = dealerData.data.filter((dealer: any) =>
          assignedDealerIds.includes(dealer.id)
        );
        setFilteredDealers(filtered);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDealersAndCarData();
  }, [carId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [alertMessage]);

  const saveReservation = async () => {
    if (!date) {
      setAlertMessage({
        message: 'Please select a date.',
        type: 'error'
      });
      closeModal();
      return;
    }

    if (!selectedDealer) {
      setAlertMessage({
        message: 'Please select a dealer.',
        type: 'error'
      });
      closeModal();
      return;
    }

    // Fetch existing reservations
    let existingReservations;
    try {
      existingReservations = await getReservationData();
    } catch (error) {
      console.error('Error fetching existing reservations:', error);
      setAlertMessage({
        message: 'Failed to fetch existing reservations.',
        type: 'error'
      });
      return;
    }

    if (!existingReservations || !existingReservations.data || !Array.isArray(existingReservations.data)) {
      console.error('Unexpected reservation data structure:', existingReservations);
      setAlertMessage({
        message: 'Failed to fetch existing reservations.',
        type: 'error'
      });
      return;
    }

    // Check if reservation already exists
    const reservationExists = existingReservations.data.some((reservation: any) => {
      const reservationDate = reservation?.attributes?.reservationDate;
      const reservationCarId = reservation?.attributes?.car?.data?.id;
      const reservationDealerId = reservation?.attributes?.dealer;

      return (
        reservationDate === formatDateForStrapi(date) &&
        reservationCarId === carId &&
        reservationDealerId === selectedDealer
      );
    });

    if (reservationExists) {
      setAlertMessage({
        message: 'This reservation already exists. Please check your dashboard.',
        type: 'error'
      });
      closeModal();
      return;
    }

    // Proceed to save the reservation
    setAlertMessage({
      message: 'Reservation saved! We are waiting for you.',
      type: 'success'
    });

    const data = {
      data: {
        lastname: userData.given_name,
        firstname: userData.family_name,
        email: userData?.email,
        reservationDate: date ? formatDateForStrapi(date) : null,
        car: carId,
        dealer: selectedDealer,
      }
    };

    try {
      const response = await postData('http://127.0.0.1:1337/api/reservations?populate=*', data);
      if (response) {
        router.refresh();
        setDate(undefined);
        setSelectedDealer(null);
        closeModal();
      }
    } catch (error) {
      console.error('Error saving reservation:', error);
      setAlertMessage({
        message: 'Failed to save the reservation.',
        type: 'error'
      });
    }
  }


  return (
    <div className='container'>
      {
        isUserAuthenticated ? (
          <Button onClick={openModal}>Make a reservation</Button>
        ) : (
          <Link href='/sign-in'><Button>Make a reservation</Button></Link>
        )
      }

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              disabled={isPast}
            />
          </PopoverContent>
        </Popover>

        <div className='mt-4'>
          <select
            className='border p-2 rounded'
            onChange={(e) => setSelectedDealer(e.target.value)}
            value={selectedDealer || ''}
          >
            <option value="" disabled>Select a dealer</option>
            {filteredDealers.map(dealer => (
              <option key={dealer.id} value={dealer.id}>
                {dealer.attributes.title}
              </option>
            ))}
          </select>
        </div>

        <div className='reserve-btn my-6'>
          <Button onClick={saveReservation}>Make a reservation</Button>
        </div>
      </Modal>
      <div className='my-4 max-w-[400px]'>{alertMessage && <AlertMessage message={alertMessage.message} type={alertMessage.type} />}</div>
    </div>
  );
}

export default Reservation;
