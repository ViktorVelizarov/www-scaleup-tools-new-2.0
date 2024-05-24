import mongoose from "mongoose";
import Transaction from "../../../../utils/models/transactionModel";

export default async function addTransaction(req, res) {
  console.log("In the addEvent route:");
  console.log(req.body);
  // const captchaResult = await verifyRecaptcha(req.body.captcha);
  // if (captchaResult) {
    const newEvent = await Transaction.create({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      company: req.body.company,
      query: req.body.query,
      message: req.body.message,
      bookingInfo: req.body.bookingInfo,
      companyCountry: req.body.companyCountry,
      companyCity: req.body.companyCity,
      companyStreet: req.body.companyStreet,
      companyPostal: req.body.companyPostal,
      ico: req.body.ico,
      dic: req.body.dic,
      vatPayer: req.body.vatPayer,
    });
    console.log("result of the event save:");
    console.log(newEvent);
    res.status(200).json(newEvent);
  // } else {
  //   return res.status(500).json({ status: "Enter the captcha, please" });
  // }
}

const verifyRecaptcha = async (captcha) => {
  const secretKey = process.env.SECRET_KEY_CAPTCHA;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`;
  const response = await fetch(url, {
    method: "POST",
  });
  const googleResponse = await response.json();
  console.log(googleResponse);
  const result = googleResponse.success;
  return result;
};