'use client';
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

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
      await postData('https://cars-app-cfm9.onrender.com/api/carts?populate=*', data);
      router.refresh();
    } catch (error) {
      console.error('Error adding one more item:', error);
    }
  };

  return (
    <div>
      <Button onClick={addOneMore}>+</Button>
    </div>
  );
};

export default AddMore;
