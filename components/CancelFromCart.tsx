'use client'
import { mainUrl } from "@/app/api/getData"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"




const deleteData = async (url: string) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-type' : 'application/json',
    }
  }
  try {
    const res = await fetch(url, options);
    const data = await res.json()
    return data;
  } catch(error) {
    console.log(error);
  }
}

const CancelFromCart = ({cart}: {cart: any}) => {
  const router = useRouter()
  const cancelFromCart = (id: number) => {
    deleteData(`${mainUrl}/api/carts/${id}`);
    router.refresh()
  }
  return (
    <Button onClick={() => cancelFromCart(cart.id)} className="button">-</Button>
  )
}

export default CancelFromCart;