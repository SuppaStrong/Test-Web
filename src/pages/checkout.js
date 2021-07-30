import Header from "../components/Header";
import Image from "next/dist/client/image";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import { useSession } from "next-auth/client";
import Currency from "react-currency-formatter";

function Checkout() {
    const items = useSelector(selectItems);
    const total = useSelector(selectTotal)
    const [session] = useSession();
    
  return (
    <div className="bg-gray-100 ">
      <Header />
      <main className="mx-auto max-w-screen-2xl lg:flex">
        {/* left */}
        <div className="flex-grow m-5 shadow-lg ">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white ">
            <h1 className="pb-4 text-3xl font-bold border-b ">
              {items.length === 0
                ? "Your Basket is Empty"
                : "Your shopping basket"}
            </h1>
            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        {/* Subtotal Right */}
        <div className="flex flex-col p-10 m-5 mx-auto bg-white shadow-lg">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal for {items.length} items : 
                <span className="mx-2 font-bold">
                  <Currency quantity={total} currency="VND" />
                </span>
              </h2>

              <button
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 to-gray-300"
                }`}
              >
                {!session ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Checkout;
