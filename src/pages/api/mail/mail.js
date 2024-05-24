import fetch from "isomorphic-fetch";
import nodemailer from "nodemailer";
import { google } from "googleapis";

const handler = async (req, res) => {
  const body = req.body;
  console.log(body);
  const captchaResult = await verifyRecaptcha(body.captcha);
  if (captchaResult) {
    const result = await sendMail(body);
    if (result.accepted) {
      res.status(200).json({
        status: "Your message is received and we will contact you soon.",
      });
    } else {
      res.status(500).json({
        status: "Something went wrong...",
      });
    }
  } else {
    return res.status(500).json({ status: "Enter the captcha, please" });
  }
};

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

const sendMail = async (data) => {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_EMAIL_CLIENT_ID,
    process.env.GOOGLE_EMAIL_CLIENT_SECRET,
    [
      "https://developers.google.com/oauthplayground",
      "http://localhost:3000/",
      "https://scaleup.tools",
      "https://www-scaleup-tools-rework.vercel.app",
    ]
  );
  oAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "webs@scaleup.agency",
        clientId: process.env.GOOGLE_EMAIL_CLIENT_ID,
        clientSecret: process.env.GOOGLE_EMAIL_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const text = `
    <b>Name:</b> ${data.name}<br/>
    <b>Phone:</b> ${data.tel}<br/>
    <b>Email:</b> ${data.email}<br/>
    <b>Company:</b> ${data.company}<br/>
    <b>Query:</b> ${data.query}<br/>
    <b>Message:</b> ${data.message}<br/>
    `;
    const mailOptions = {
      from: "webs@scaleup.agency",
      to: "contact@scaleup.tools",
      subject: "SCALEUP.tools form submition",
      html: text,
    };
    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default handler;
