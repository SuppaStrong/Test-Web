import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { selectItems } from "../slices/basketSlice";
import { useSelector } from "react-redux";

function Header() {
  const [session] = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);

  return (
    <header>
      {/* Top nav */}
      {/* Left */}
      <div className="flex items-center flex-grow p-1 py-2 bg-amazon_blue">
        <div className="flex items-center flex-grow mt-px sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            src="https://links.papareact.com/f90"
            height={40}
            width={150}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>

        <div className="items-center flex-grow h-10 bg-yellow-500 rounded-md cursor-pointer sm:flex hover:bg-yellow-600">
          <input
            type="text"
            className="flex-grow flex-shrink w-6 h-full p-2 px-4 rounded-l-md focus:outline-none"
          />
          <SearchIcon className="h-12 p-4 " />
        </div>
        {/* Right */}
        <div className="flex items-center mx-6 space-x-6 text-xs text-white">
          <div
            onClick={!session ? signIn : signOut}
            className="cursor-pointer link"
          >
            <p className="font-normal ">
              {session ? `Hello , ${session.user.name}` : "Hello !!"}
            </p>
            <p className="font-bold md:text-sm">Account & Lists </p>
          </div>
          <div
            className="link"
            onClick={() => session && router.push("/oders")}
          >
            <p className="font-normal">Returns</p>
            <p className="font-bold md:text-sm">Order</p>
          </div>
          <div
            onClick={() => router.push("/checkout")}
            className="relative flex items-center link"
          >
            <span className="absolute top-0 right-0 w-4 h-4 text-center text-black bg-yellow-600 rounded-full md:right-10 ">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden font-bold md:text-sm md:inline">Basket</p>
          </div>
        </div>
      </div>
      {/* Bottom nav */}
      <div className="flex items-center p-2 space-x-3 text-sm text-white bg-gray-700 pl">
        <p className="flex items-center link">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className="hidden link lg:inline-flex ">Electronics</p>
        <p className="hidden link lg:inline-flex ">Fridge</p>
        <p className="hidden link lg:inline-flex ">Television</p>
        <p className="hidden link lg:inline-flex ">Phone</p>
      </div>
    </header>
  );
}

export default Header;
