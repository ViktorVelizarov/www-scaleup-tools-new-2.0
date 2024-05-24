const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res){
  console.log("in creating new stripe session...");
  console.log(req.body);
  if(req.method === "POST"){
    try{
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: getPrice(req.body.query),
            quantity: 1,
            tax_rates:
              req.body.vatPayer === "Non-payer" ? ["txr_1N17gSICWkuLhQbM2qLAo25h"] : [],
          },
        ],
        invoice_creation: { enabled: true },
        customer_email: req.body.email,
        mode: "payment",
        success_url: `${req.body.origin}/checkout-result?success=true&transactionId=${req.body._id}`,
        cancel_url: `${req.body.origin}/checkout-result?canceled=true&transactionId=${req.body._id}`,
        metadata: {
          bookingInfo: req.body.bookingInfo,
          tansactionId: req.body._id,
        },
      });
      console.log("new session:");
      console.log(session.url);
      res.status(200).json({url: session.url});
    } catch(err){
      res.status(err.statusCode || 500).json(err.message);
    }
  }else{
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

const getPrice = (query) => {
  if(query  === "Quick win"){
    return "price_1N17WnICWkuLhQbMXiJVQsqc";
    // return "price_1N12xFICWkuLhQbMjgIy9ovQ";
  }else if (query === "Training day (group)") {
    return "price_1N17WFICWkuLhQbMaUsw70fR";
    // return "price_1N12vRICWkuLhQbML7CmmKST";
  }else{
    return "price_1N17V8ICWkuLhQbMuBbIvQj6";
    // return "price_1N12ulICWkuLhQbM9EVFUNAS";
  }
}