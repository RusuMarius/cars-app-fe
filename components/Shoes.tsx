import { getCartData, getShoes } from "@/app/api/getData"
import ShoesList from "./ShoesList"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"


const Shoes = async () => {
  const {isAuthenticated, getUser} = getKindeServerSession()
  const isUserAuthenticated = await isAuthenticated()
  const userData = await getUser()
  const cart = getCartData()
  const shoes = await getShoes()


  return (
    <div className="container">
      <ShoesList shoes={shoes} cart={cart} isUserAuthenticated={isUserAuthenticated} userData={userData} products={undefined} />
    </div>
  )
}

export default Shoes