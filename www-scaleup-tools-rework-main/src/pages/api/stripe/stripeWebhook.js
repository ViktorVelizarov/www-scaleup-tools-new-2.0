import Stripe from "stripe";
import { buffer } from "micro";
import Transaction from "../../../../utils/models/transactionModel";

export const config = {
  api: {
    bodyParser: false,
  }
}

export default async function stripeWebhook(req, res){
  console.log("stripe webhook...");
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  if(req.method === "POST"){
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET;

    let event;

    try {
      if(!sig || !webhookSecret){
        res.status(401);
      }
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (error) {
      console.log(`Webhook error: ${error.message}`);
      return res.status(400).send(`Webhook error: ${error.message}`);
    }
    if (event.type === "checkout.session.completed") {
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        {
          expand: ["line_items"],
        }
      );
      const tansactionId = sessionWithLineItems.metadata.tansactionId;
      console.log("Tansaction ID that will be canceld:");
      console.log(tansactionId);
        const result = await Transaction.findByIdAndUpdate(
          tansactionId,
          { paid: true }
        );
        console.log(result);
        res.status(200).json(result);
    }else if (event.type === "checkout.session.expired"){
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        {
          expand: ["line_items"],
        }
      );
      const bookingInfo = sessionWithLineItems.metadata.bookingInfo;
      const options = {
        method: "POST",
        url: `${bookingInfo}/cancellation`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CALENDLY_API_KEY}`,
        },
        data: { reason: "The reservation has not been paid." },
      };
      try {
        const response = await axios.request(options);
        const result = await Transaction.findByIdAndDelete(bookingInfo);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json(error);
      }
    } 
    res.status(200).send();
  }
}