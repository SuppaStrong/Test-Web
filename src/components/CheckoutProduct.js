import { StarIcon } from "@heroicons/react/solid";
import Image from "next/dist/client/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { removeFromBasket, addToBasket } from "../slices/basketSlice";

function CheckoutProduct({
  id,
  title,
  price,
  description,
  category,
  image,
  hasPrime,
  rating,
}) {
  const dispatch = useDispatch();

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };

  return (
    <div className="grid grid-cols-5 mt-2">
      <Image src={image} width={200} height={200} objectFit="contain" />
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="my-2 text-xs line-clamp-3 ">{description}</p>
        <Currency quantity={price} currency="USD" />

        {hasPrime && (
          <div className="flex items-center space-x-1">
            <img
              loading="lazy"
              src="https://links.papareact.com/fdw"
              alt="image"
              className="w-12"
            />
            <p className="text-xs text-gray-500">Free Shipping</p>
          </div>
        )}
      </div>

      {
        <div className="flex flex-col self-center space-y-2 col-span-1my-auto ">
          <button className="button" onClick={removeItemFromBasket}>
            Remove Product
          </button>
          <button className="button" >
            Buy One More
          </button>
        </div>
      }
    </div>
  );
}

export default CheckoutProduct;
