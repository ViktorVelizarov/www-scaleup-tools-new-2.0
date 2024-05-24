import Transaction from "../../../../utils/models/transactionModel";
import qs from "qs";

export default async function deleteSelected(req, res) {
  try {
    console.log("In the changeProcessStatus route:");
    console.log(req.query);
    const objectOfIds = req.query;
    console.log(objectOfIds);
    const ids = Object.values(objectOfIds);
    const result = await Transaction.deleteMany(
      { _id: { $in: ids } }
    );
    const updatedTransactions = await Transaction.find();
    res.status(200).json(updatedTransactions);
  } catch (error) {
    res.status(500).json(error);
  }
}
