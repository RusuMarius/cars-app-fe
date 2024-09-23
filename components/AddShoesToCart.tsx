'use client'
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { mainUrl } from "@/app/api/getData";

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

interface addShoesToCartProps {
  cart: any;
  shoe: any;
  isUserAuthenticated: boolean;
  userData: any;
}

const AddShoesToCart = ({shoe, isUserAuthenticated, userData}: Readonly<addShoesToCartProps>) => {
  const router = useRouter();

  const saveAddShoesToCart = () => {
    const shoeId = shoe.data?.id || shoe.id;

    const data = {
      data: {
        lastname: userData.given_name,
        firstname: userData.family_name,
        email: userData?.email,
        shoe: shoeId,
      }
    };

    postData(`${mainUrl}/api/carts?populate=*`, data);
    router.refresh();
  }

  return (
    <div>
      <div>
        {isUserAuthenticated ?
          (<Button className="my-4" onClick={() => saveAddShoesToCart()}>Add to cart</Button>) :
          (<Link href="/sign-in"><Button className="my-4">Add to cart</Button></Link>)
        }
      </div>
    </div>
  )
}

export default AddShoesToCart;
