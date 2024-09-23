'use client'
import { mainUrl } from "@/app/api/getData"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"

const deleteData = async (url: string) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    }
  }
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

const CancelFromCart = ({ cart }: { cart: any }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const cancelFromCart = async (id: number) => {
    setLoading(true); // Start loading state
    await deleteData(`${mainUrl}/api/carts/${id}`);
    router.refresh(); // Refresh after deletion is done
    setLoading(false); // End loading state
  }

  return (
    <Button
      onClick={() => cancelFromCart(cart.id)}
      className="button"
      disabled={loading} // Disable the button while loading
    >
      {loading ? 'Removing...' : '-'}
    </Button>
  );
}

export default CancelFromCart;
