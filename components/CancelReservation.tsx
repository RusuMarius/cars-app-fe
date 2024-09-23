'use client'
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { TrashIcon } from '@heroicons/react/24/outline'
import Modal from "./Modal"
import { useState } from "react"
import { mainUrl } from "@/app/api/getData"

const deleteData = async (url: string) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    }
  }
  try {
    const res = await fetch(url, options);
    const data = await res.json()
    return data;
  } catch (error) {
    console.log(error);
  }
}

const CancelReservation = ({ reservation }: { reservation: any }) => {
  const router = useRouter()
  const cancelReservation = (id: number) => {
    deleteData(`${mainUrl}/api/reservations/${id}`);
    router.refresh();
    closeModal();
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
