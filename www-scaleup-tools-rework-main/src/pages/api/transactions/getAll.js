import mongoose from "mongoose";
import Transaction from "../../../../utils/models/transactionModel";

const handler = async (req, res) => {
  console.log("getting users in API");
  const transactions = await Transaction.find();
  res.status(200).json(transactions);
};

export default handler;
