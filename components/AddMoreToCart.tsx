'use client';
import { mainUrl } from "@/app/api/getData";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const postData = async (url: string, data: object) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data),
  };
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const AddMore = ({ cart }: { cart: any }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const addOneMore = async () => {
    const data = {
      data: {
        lastname: cart.attributes.lastname,
        firstname: cart.attributes.firstname,
        email: cart.attributes.email,
        product: cart.attributes.product?.data?.id ?? null,
        shoe: cart.attributes.shoe?.data?.id ?? null,
      },
    };

    try {
      setLoading(true);
      await postData(`${mainUrl}/api/carts?populate=*`, data);
      router.refresh();
      setLoading(false);
    } catch (error) {
      console.error('Error adding one more item:', error);
    }
  };

  return (
    <div>
      <Button onClick={addOneMore}>{loading ? 'Adding...' : '+'}</Button>

    </div>
  );
};

export default AddMore;
