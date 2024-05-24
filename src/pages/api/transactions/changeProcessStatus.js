import Transaction from "../../../../utils/models/transactionModel";

export default async function changeProcessStatus(req, res) {
  try {
    console.log("In the changeProcessStatus route:");
    console.log(req.body);
    const result = await Transaction.updateMany(
      { _id: { $in: req.body.ids } },
      { processed: Boolean(req.body.processedState) }
    );
    const updatedTransactions = await Transaction.find();
    res.status(200).json(updatedTransactions);
  } catch (error) {
    res.status(500).json(error);
  }
}
