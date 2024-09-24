'use client';

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { TrashIcon } from '@heroicons/react/24/outline';
import Modal from "./Modal";
import { useState } from "react";
import { mainUrl } from "@/app/api/getData";

const deleteData = async (url: string) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    }
  };
  try {
    const res = await fetch(url, options);
    if (res.ok) {
      return true;
    } else {
      console.error('Error deleting reservation:', res.statusText);
      return false;
    }
  } catch (error) {
    console.error('Network error:', error);
    return false;
  }
}

const CancelReservation = ({ reservation }: { reservation: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const cancelReservation = async (id: number) => {
    const success = await deleteData(`${mainUrl}/api/reservations/${id}`);
    if (success) {
      closeModal();
      router.refresh(); // Refresh the page to reflect the updated reservation list
    }
  }

  return (
    <div>
      <TrashIcon className="w-6 h-6 remove-reservation remove-reservation-wrapper" onClick={openModal} />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h4 className="mb-6">Are you sure?</h4>
        <div className="flex justify-end">
          <Button className="alert-modal-cta" onClick={() => cancelReservation(reservation.id)}>Yes</Button>
          <Button className="alert-modal-cta" onClick={closeModal}>Cancel</Button>
        </div>
      </Modal>
    </div>
  )
}

export default CancelReservation;
