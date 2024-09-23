import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUserCartProducts } from "../api/getData";
import CancelFromCart from "@/components/CancelFromCart";
import AddMore from "@/components/AddMoreToCart";
import img from '../../assets/shopping.png';
import Image from "next/image";
import CheckoutButton from "@/components/CheckoutButton";

const Cart = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const allCartProducts = await getUserCartProducts();

  // Filter cart products based on user email
  const userCartProducts = user?.email
    ? allCartProducts.data.filter((cart: { attributes: { email: string | null; }; }) => cart.attributes.email === user.email)
    : [];

  // Count products
  const productCounts = userCartProducts.reduce((acc: any, cart: any) => {
    const productId = cart.attributes.product.data?.id ? `product-${cart.attributes.product.data.id}` : null;
    const shoeId = cart.attributes.shoe.data?.id ? `shoe-${cart.attributes.shoe.data.id}` : null;
    const itemId = productId || shoeId;

    if (itemId) {
      if (!acc[itemId]) {
        acc[itemId] = { ...cart, quantity: 1 };
      } else {
        acc[itemId].quantity += 1;
      }
    }

    return acc;
  }, {});

  const uniqueProducts = Object.values(productCounts);
  const shopping = 2;

  // Total price of all products without promotion
  const totalPrice = uniqueProducts.reduce((total: number, cart: any) => {
    const productPrice = cart.attributes.product.data?.attributes.price;
    const shoePrice = cart.attributes.shoe.data?.attributes.price;
    const price = productPrice || shoePrice || 0; // Default to 0 if price is null
    const productQuantity = cart.quantity;
    return total + price * productQuantity;
  }, 0);

  // Total promotion for all products
  const totalPromotion = uniqueProducts.reduce((totalPromo: number, cart: any) => {
    const productPrice = cart.attributes.product.data?.attributes.price;
    const shoePrice = cart.attributes.shoe.data?.attributes.price;
    const productPromotion = cart.attributes.product.data?.attributes.promotion;
    const shoePromotion = cart.attributes.shoe.data?.attributes.promotion;
    const price = productPrice || shoePrice || 0; // Default to 0 if price is null
    const promotion = productPromotion || shoePromotion || 0; // Default to 0 if promotion is null
    const productQuantity = cart.quantity;
    return totalPromo + (price * (promotion / 100)) * productQuantity;
  }, 0);

  // Final total price after applying all promotions
  const finalTotalPrice = totalPrice - totalPromotion + shopping;
  const productsPrice = totalPrice - totalPromotion;


  return (
    <section className="min-h-[80vh]">
      <div className="container">
        <h3 className="my-10 font-bold">My products</h3>
        <div className="flex flex-col lg:flex-row">

          {uniqueProducts.length < 1 ? (
            <div className="w-[100%] lg:w-[100%] text-center">
              <div>
                <Image className="mx-auto mb-5" src={img} width={200} height={200} alt="" />
                <p className="mb-5">You don&apos;t have any products.</p>
                <Link href="/products">
                  <Button>Back to products</Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="w-[100%] lg:w-[70%]">
                <div>
                  {
                    uniqueProducts.map((cart: any) => {
                      const productPrice = cart.attributes.product.data?.attributes.price || 0;
                      const shoePrice = cart.attributes.shoe.data?.attributes.price || 0;
                      const productPromotion = cart.attributes.product.data?.attributes.promotion || 0;
                      const shoePromotion = cart.attributes.shoe.data?.attributes.promotion || 0;
                      const price = productPrice || shoePrice || 0;
                      const prodPromotion = productPromotion || shoePromotion || 0;
                      const productQuantity = cart.quantity;
                      const totalProductPrice = price * productQuantity;
                      const promotedPrice = totalProductPrice - (totalProductPrice * (prodPromotion / 100));
                      const title = cart.attributes.product.data?.attributes.title || cart.attributes.shoe.data?.attributes.title || 'Untitled';
                      const imageUrl = cart.attributes.product.data?.attributes.imageUrl || cart.attributes.shoe.data?.attributes.imageUrl || '';

                      return (
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 mb-4 bg-blue-100 gap-4 rounded-lg" key={cart.id}>
                          <div className="flex gap-4 items-center">
                            <div><img className="cart-img" src={imageUrl} alt={title} /></div>
                            <div>
                              <h4 className="font-bold">
                                {title}
                              </h4>
                            </div>
                          </div>
                          <div className="counter flex flex-row sm:flex-col items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CancelFromCart cart={cart} />
                              <Button> {cart.quantity} </Button>
                              <AddMore cart={cart} />
                            </div>
                            <div className="sm:ml-auto sm:mt-5 flex flex-col items-end">

                              {prodPromotion > 0 ? (
                                <>
                                <p><span className="text-gray-500 old-price text-base">${totalProductPrice.toFixed(2)}</span></p>
                                <p><span className="text-red-600">${promotedPrice.toFixed(2)}</span></p>
                                </>
                              ) : (
                                <p className="text-red-600"><span>${totalProductPrice.toFixed(2)}</span></p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  }
                </div>
              </div>
              <div className="w-[100%] m-[0px] md:w-[400px] lg:w-[30%] px-8 py-5 bg-blue-100 lg:ml-4 flex flex-col rounded-lg mb-4">
                <h2 className="mb-3">Order summary</h2>
                <p className="flex justify-between">Products cost: <span className="text-red-600 font-bold">${productsPrice.toFixed(2)}</span></p>
                {totalPromotion ? <p className="my-2 flex justify-between">You saved: <span className="text-green-600 font-bold">-${totalPromotion.toFixed(2)}</span></p> : ''}

                <p className="flex justify-between">Shipping: <span className="font-bold">${shopping}</span></p>
                <div className="total-price">
                  <h3>Final to pay: <p className="text-red-600 font-bold">${finalTotalPrice.toFixed(2)}</p></h3>
                </div>
                <div className="mt-10">
                <CheckoutButton products={uniqueProducts} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
