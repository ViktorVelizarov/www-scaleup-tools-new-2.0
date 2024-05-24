import axios from "axios";
import Transaction from "../../../../utils/models/transactionModel";

export default async function cancelCalendlyBooking(req, res) {
  const transactionData = await Transaction.findById(req.body.id);
  console.log(transactionData);
  if (transactionData) {
    const options = {
      method: "POST",
      url: `${transactionData.bookingInfo}/cancellation`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CALENDLY_API_KEY}`,
      },
      data: { reason: "The reservation has not been paid." },
    };
    try {
      const response = await axios.request(options);
      const result = await Transaction.findByIdAndDelete(req.body.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
