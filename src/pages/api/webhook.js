
import { buffer } from "micro";
import * as admin from 'firebase-admin';

const serviceAccount = require('../../../permissions.json');

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
        console.log("fulfillOder",session);

        return app
        .firestore()
        .collection("user")
        .doc(session.metadata.email)
        .collection("oders")
        .doc(session.id).set({
            amount: session.amount_total / 100,
            currency: session.currency,
            image: JSON.parse(session.metadata.image),
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
        }).then(() => {
            console.log(`Success: Oder ${session.id} had been added to DB`);
        })

}

export default async (req, res) => {
    if (req.method === 'POST') {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers["stripe-signature"];

        let event;

        try {
            event = stripe.webhooks.constructEvent(
              payload,
              sig,
              endpointSecret
            );

        } catch (err) {
            console.log('ERROR', err.message)
            return res.status(400).send(`Webhook error : ${err.message}`)
        }
        
        if (event.type ==='checkout.session.completed') {
            const session = event.data.object;
            console.log('checkout session complete');

            return fulfillOrder(session).then(() => res.status(200)).catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
        }
    }
};

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
};





