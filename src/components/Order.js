import moment from "moment";
import Currency from "react-currency-formatter";


function Order({id , amount , items , timestamp , image }) {
    return (
      <div className="relative border rounded-md">
        <div className="flex items-center p-5 space-x-10 text-sm text-gray-600 bg-gray-100">
          <div>
            <p className="text-xs font-bold">Order placed</p>
            <p>{moment.unix(timestamp).format("DD MMM YYYY")}</p>
          </div>
          <div>
            <p className="text-xs font-bold">Total</p>
            <p>
              <Currency quantity={amount} currency="USD" />
            </p>
          </div>
          <p className="self-end flex-1 text-xs text-right text-blue-500 whitespace-nowrap sm:text-xl">
            {items.length} items
          </p>

          <p className="absolute w-40 text-xs truncate top-2 right-2 lg:w-72 whitespace-nowrap">
              Oder # {id}
          </p>
        </div>
        <div className="p-5 sm:p-10">
            <div className="flex space-x-6 overflow-x-auto">
                {image.map(
                    images => (
                        <img src={images} alt="" className="object-contain h-20 sm:h-32" />
                    )
                )}
            </div>
        </div>
      </div>
    );
}



export default Order
