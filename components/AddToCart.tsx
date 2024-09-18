'use client'
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const postData = async(url: string, data: object) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data),
  }
  try {
    const res = await fetch(url, options)
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error);
  }
}

interface addToCartProps {
  cart: any;
  product: any;
  isUserAuthenticated: boolean;
  userData: any;
}

const AddToCart = ({product, isUserAuthenticated, userData}: Readonly<addToCartProps>) => {
  const router = useRouter();

  const saveAddToCart = () => {
    const productId = product.data?.id || product.id;

    const data = {
      data: {
        lastname: userData.given_name,
        firstname: userData.family_name,
        email: userData?.email,
        product: productId,
      }
    };

    postData('https://cars-app-cfm9.onrender.com/api/carts?populate=*', data);
    router.refresh();
  }

  return (
    <div>
      <div>
        {isUserAuthenticated ?
          (<Button className="my-4" onClick={() => saveAddToCart()}>Add to cart</Button>) :
          (<Link href="/sign-in"><Button className="my-4">Add to cart</Button></Link>)
        }
      </div>
    </div>
  )
}

export default AddToCart;
