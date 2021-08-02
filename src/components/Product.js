import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useState } from 'react';
import  Currency  from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

const MAX_RATTING = 5;
const MIN_RATTING = 1;

function Product({ key , id, title, price, description, category, image }) {
    const dispatch = useDispatch();
    //Rating random shit
    const [rating] = useState(
        Math.floor(Math.random()* (MAX_RATTING - MIN_RATTING +1)) + MIN_RATTING
    );
    // has Free ship random shit
    const [hasPrime] = useState(
        Math.random() < 0.5  
    );

    // Add item to basket
      const addItemToBasket = () => {
        //State
        const product = {
          id,
          title,
          price,
          description,
          category,
          image,
          rating,
          hasPrime,
        };
        //Action
        dispatch(addToBasket(product));
      }
      
    
  return (
    <div className="relative z-30 flex flex-col p-10 m-5 bg-white shadow-xl" >
      <p className="absolute text-xs italic text-gray-400 top-2 right-2">{category}</p>
      <Image
        src={image}
        height={200}
        width={200}
        objectFit="contain"
        className="cursor-pointer"
      />
      <h4 className="my-3 ">{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon className="h-5 text-yellow-500" />
          ))}
      </div>
      {hasPrime && (
        <div className="flex items-center -mt-5 space-x-2 ">
          <img src="https://links.papareact.com/fdw" alt="image" className="w-12" />
          <p className="text-xs text-gray-500 ">Free Shipping</p>
        </div>
      )}
      <p className="my-2 text-xs line-clamp-2">{description}</p>
      <div className="mb-5">
        <Currency quantity={price} currency="USD" />
      </div>
      <button onClick={addItemToBasket} className="mt-auto button">Add to Basket</button>
    </div>
  );
}

export default Product
