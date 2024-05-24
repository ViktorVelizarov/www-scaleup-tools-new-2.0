import { Schema, models } from 'mongoose';
import { suToolsConnection } from '../connectDB';

const transactionSchema = new Schema(
  {
    date: { type: Date, default: new Date() },
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    company: { type: String },
    companyCountry: {type: String},
    companyCity: {type: String},
    companyStreet: {type: String},
    companyPostal: {type: String},
    query: { type: String },
    message: { type: String },
    bookingInfo: { type: String },
    paid: { type: Boolean, default: false },
    processed: { type: Boolean, default: false },
    ico: { type: String },
    dic: { type: String },
    vatPayer: { type: String },
  },
  { collection: "transaction" }
);

const Transaction = models.Transaction || suToolsConnection.model('Transaction', transactionSchema);

export default Transaction;
