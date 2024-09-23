import { getProdData } from "@/app/api/getData"
import AddToCart from "@/components/AddToCart"
import { getCartData } from "@/app/api/getData"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import PopularProducts from "@/components/PopularProducts"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"



const ProductDetails = async ({params}: {params: any}) => {

  const product = await getProdData({params})
  const imgURL = `http://127.0.0.1:1337${product.data.attributes.image.data[0].attributes.url}`
  const cart = getCartData()
  const {isAuthenticated, getUser} = getKindeServerSession()
  const isUserAuthenticated = await isAuthenticated()
  const userData = await getUser()



  return (
    <div className="container overflow-hidden">
      <Link className="mb-10 mt-10 table" href="/clothes"><Button>Back to product list</Button></Link>
      <div className="content-product flex flex-col md:flex-row my-20 w-[100%] items-center text-center md:items-left md:text-left">
        <div><Image className="max-w-2xl w-full relative product-big-image" fill src={imgURL} alt={""} /></div>
        <div className="md:ml-10 max-w-[600px]">
          <div>
            <div>
              <h2>{product.data?.attributes.title}</h2>
            </div>
          </div>
          <p className="my-5">This product is for <span className="text-red-600 font-bold">{product.data?.attributes.type}</span></p>
          <p>{product.data?.attributes.description}</p>
          <div className="ml-auto">
          <div className="cart">
            <h4 className="mt-6 nb-4">Product price: <span className="text-red-600 font-bold">${product.data?.attributes.price} </span></h4>
            <AddToCart product={product} cart={cart} isUserAuthenticated={isUserAuthenticated} userData={userData} />
          </div>
        </div>
        </div>
      </div>
      <PopularProducts />
    </div>
  )
}

export default ProductDetails