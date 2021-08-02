import moment from "moment";
import { getSession, useSession } from "next-auth/client";
import db from "../../firebase";
import Header from "../components/Header";
import Order from "../components/Order";

function Oders({ orders }) {
  const [session] = useSession();

  console.log("oders", orders);
  return (
    <div>
      <Header />
      <main className="max-w-screen-lg p-10 mx-auto">
        <h1 className="pb-1 mb-2 text-3xl font-medium border-b border-yellow-400">
          Your Oders
        </h1>

        {session ? (
          <h2>{orders.length} Orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}

        <div className="mt-5 space-y-4">
          {orders.map(({ id, amount, items, image, timestamp }) => (
            <Order
              key={id}
              id={id}
              amount={amount}
              items={items}
              image={image}
              timestamp={timestamp}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Oders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  // Get users loggin creadentials
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  // Pull from firebase
  const stripeOders = await db
    .collection("user")
    .doc(session.user.email)
    .collection("oders")
    .orderBy("timestamp", "desc")
    .get();

  const orders = await Promise.all(
    stripeOders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      image: order.data().image,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );
  return {
    props: {
      orders,
    },
  };
}
