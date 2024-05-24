import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Select from "../Select/Select";
import ReCAPTCHA from "react-google-recaptcha";
import Spinner from "../Spinner/Spinner";
import Link from "next/link";
import DialogWindow from "../DialogWindow/DialogWindow";
import { useCalendlyEventListener, PopupButton } from "react-calendly";
import axios from "axios";
import {loadStripe} from "@stripe/stripe-js"
import Radio from "../Radio/Radio";

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_PUBLISHABLE_KEY}`);

function Form({selectedItem, options}) {
  const [captcha, setCaptcha] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({});
  // {
  //   name: "Danylo Sokol",
  //   email: "dansokol677@gmail.com",
  //   tel: "+421918884245",
  //   company: "SCALEUP.",
  //   companyCountry: "Slovakia",
  //   companyCity: "Kosice",
  //   companyStreet: "Juzna",
  //   companyPostal: "040 010"
  //   ico: "12345678",
  //   dic: "1234567890",
  //   message: "Some message for the SU.tools",
  // }
  const [booked, setBooked] = useState("");

  // "https://api.calendly.com/scheduled_events/1fb69909-5a97-4c04-88dc-0ab16daeddf7"

  const vatBtns = [
    {
      name: "Payer",
    },
    {
      name: "Non-payer",
    },
  ];
  const [vatPayer, setVatPayer] = useState(vatBtns[0].name);
  const router = useRouter();

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, []);

  useCalendlyEventListener({
    onEventScheduled: (e) => {
      console.log("Event scheduled:");
      console.log(e.data.payload);
      setBooked(e.data.payload.event.uri);
    },
  });

  const handleInputChange = (event) => {
    console.log("handling input change...");
    let { name, value } = event.target;
    console.log(name);
    console.log(value);
    if (name === "honeyfreename") {
      name = "name";
    } else if (name === "honeyfreeemail") {
      name = "email";
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    // Check honeypot protection
    if (event.target.name[0].value || event.target.email[0].value) {
      setLoading(false);
      setResponse("Something went wrong!");
    } else if (selectedItem.selectedItem.text === options[0].text) {
      setLoading(false);
      setResponse("Choose type of query, please!");
    } else if (captcha) {
      const data = {
        name: event.target.honeyfreename.value,
        email: event.target.honeyfreeemail.value,
        tel: event.target.tel.value,
        company: event.target.company.value,
        query: selectedItem.selectedItem.text,
        message: event.target.message.value,
        captcha: captcha,
      };
      console.log(data);
      const JSONdata = JSON.stringify(data);
      const endpoint = "/api/mail/mail";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSONdata,
      };
      const response = await fetch(endpoint, options);
      // getting json body, we need because we use fetch()
      const result = await response.json();
      // const result = { status: "some text" };
      // console.log(result);
      setLoading(false);
      setResponse(result.status);
      event.target.reset();
      setCaptcha("");
      setFormData({})
    } else {
      setLoading(false);
      setResponse("Enter captcha please!");
    }
  };

  // Hnadler for form with payments
  // const handleSubmit = async (event) => {
  //   setLoading(true);
  //   event.preventDefault();
  //   // Check honeypot protection
  //   if (event.target.name[0].value || event.target.email[0].value) {
  //     setLoading(false);
  //     setResponse("Something went wrong!");
  //   } else if (selectedItem.selectedItem.text === options[0].text) {
  //     setLoading(false);
  //     setResponse("Choose type of query, please!");
  //   } else if (!booked) {
  //     setLoading(false);
  //     setResponse("Choose your time!");
  //   } else if (captcha) {
  //     const data = {
  //       name: formData.name,
  //       email: formData.email,
  //       phone: formData.tel,
  //       companyCountry: formData.companyCountry,
  //       companyCity: formData.companyCity,
  //       companyStreet: formData.companyStreet,
  //       companyPostal: formData.companyPostal,
  //       ico: formData.ico,
  //       dic: formData.dic,
  //       vatPayer: vatPayer,
  //       query: selectedItem.selectedItem.text,
  //       message: formData.message,
  //       captcha: captcha,
  //       bookingInfo: booked,
  //     };
  //     console.log("Final data:");
  //     console.log(data);
  //     axios
  //       .post("/api/transactions/addTransaction", data)
  //       .then((res) => {
  //         console.log("Response from saving to the database:");
  //         console.log(res.data);
  //         if (
  //           res.data.query !== "Free intro call" &&
  //           res.data.query !== "Other"
  //         ) {
  //           const transactionData = { ...res.data };
  //           transactionData["origin"] = window.location.href;
  //           console.log("CURRENT URL:");
  //           console.log(transactionData["origin"]);
  //           axios
  //             .post("/api/stripe/checkoutSession", transactionData)
  //             .then((res) => {
  //               console.log("new stripe url");
  //               router.push(res.data.url);
  //             })
  //             .catch((err) => {
  //               console.log(err);
  //               setResponse("Something went wrong, please try later!");
  //             });
  //         } else {
  //           setResponse("We have received your application!");
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err.response.data.status);
  //         setResponse("Something went wrong during booking you time, please try later!");
  //       });
  //     setLoading(false);
  //   } else {
  //     setLoading(false);
  //     setResponse("Enter captcha please!");
  //   }
  // };

  return (
    <div className="py-14 px-6 sm:px-0 bg-secondary-section" id="contact">
      {console.log("Form data:")}
      {console.log(formData)}
      <div className="max-w-[1240px] mx-auto">
        <form
          onSubmit={handleSubmit}
          method="POST"
          className="mx-auto max-w-xl"
        >
          <h2 className="mb-10 text-4xl font-extrabold text-accent-orange">
            Contact us
          </h2>
          <input
            type="text"
            name="name"
            class="block w-0 h-0 m-0 p-0 border-0 outline-none"
            autocomplete="off"
            aria-hidden="true"
          />
          <input
            type="email"
            name="email"
            class="block w-0 h-0 m-0 p-0 border-0 outline-none"
            autocomplete="off"
            aria-hidden="true"
          />
          <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                class="block text-sm font-semibold leading-6"
              >
                Full name{" "}
                <span className="text-accent-orange text-[1.15rem]">*</span>
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="honeyfreename"
                  id="name"
                  value={formData.name}
                  required
                  autocomplete="name"
                  pattern="^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF ,.'-]+(\s[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF ,.'-]+){0,2}$"
                  placeholder="Your full name"
                  onChange={handleInputChange}
                  className="peer block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-accent-orange placeholder:text-secondary-light focus:ring-2 focus:ring-inset focus:ring-accent outline-none"
                />
                <div class="invisible text-[.85rem] h-0 pt-0 mb-0 text-attention peer-placeholder-shown:!invisible peer-placeholder-shown:!h-0 peer-placeholder-shown:!pt-0 peer-placeholder-shown:!mb-0 peer-invalid:visible peer-invalid:h-auto peer-invalid:pt-2 peer-invalid:mb-[-1rem]">
                  Invalid Name
                </div>
                <div class="invisible text-[.85rem] h-0 pt-0 mb-0 text-valid peer-placeholder-shown:!invisible peer-placeholder-shown:!h-0 peer-placeholder-shown:!pt-0 peer-placeholder-shown:!mb-0 peer-valid:visible peer-valid:h-auto peer-valid:pt-2 peer-valid:mb-[-1rem]">
                  Valid Name
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                class="block text-sm font-semibold leading-6"
              >
                Mobile number{" "}
                <span className="text-accent-orange text-[1.15rem]">*</span>
              </label>
              <div className="mt-2.5">
                <input
                  type="tel"
                  name="tel"
                  id="tel"
                  value={formData.tel}
                  required
                  autocomplete="tel"
                  pattern="^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$"
                  placeholder="+421 XXX XXX XXX"
                  onChange={handleInputChange}
                  className="peer block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-accent-orange placeholder:text-secondary-light focus:ring-2 focus:ring-inset focus:ring-accent outline-none"
                />
                <div class="invisible text-[.85rem] h-0 pt-0 mb-0 text-attention peer-placeholder-shown:!invisible peer-placeholder-shown:!h-0 peer-placeholder-shown:!pt-0 peer-placeholder-shown:!mb-0 peer-invalid:visible peer-invalid:h-auto peer-invalid:pt-2 peer-invalid:mb-[-1rem]">
                  Invalid mobile number
                </div>
                <div class="invisible text-[.85rem] h-0 pt-0 mb-0 text-valid peer-placeholder-shown:!invisible peer-placeholder-shown:!h-0 peer-placeholder-shown:!pt-0 peer-placeholder-shown:!mb-0 peer-valid:visible peer-valid:h-auto peer-valid:pt-2 peer-valid:mb-[-1rem]">
                  Valid mobile number
                </div>
              </div>
            </div>
            <div class="sm:col-span-2">
              <label
                htmlFor="email"
                class="block text-sm font-semibold leading-6"
              >
                Email{" "}
                <span className="text-accent-orange text-[1.15rem]">*</span>
              </label>
              <div class="mt-2.5">
                <input
                  type="email"
                  name="honeyfreeemail"
                  id="email"
                  value={formData.email}
                  required
                  pattern="^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$"
                  autocomplete="email"
                  placeholder="example@gmail.com"
                  onChange={handleInputChange}
                  className="peer block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-accent-orange placeholder:text-secondary-light focus:ring-2 focus:ring-inset focus:ring-accent outline-none"
                />
                <div class="invisible text-[.85rem] h-0 pt-0 mb-0 text-attention peer-placeholder-shown:!invisible peer-placeholder-shown:!h-0 peer-placeholder-shown:!pt-0 peer-placeholder-shown:!mb-0 peer-invalid:visible peer-invalid:h-auto peer-invalid:pt-2 peer-invalid:mb-[-1rem]">
                  Invalid Email
                </div>
                <div class="invisible text-[.85rem] h-0 pt-0 mb-0 text-valid peer-placeholder-shown:!invisible peer-placeholder-shown:!h-0 peer-placeholder-shown:!pt-0 peer-placeholder-shown:!mb-0 peer-valid:visible peer-valid:h-auto peer-valid:pt-2 peer-valid:mb-[-1rem]">
                  Valid Email
                </div>
              </div>
            </div>
            <div class="sm:col-span-2">
              <label
                htmlFor="company"
                class="block text-sm font-semibold leading-6"
              >
                Company name{" "}
                <span className="text-accent-orange text-[1.15rem]">*</span>
              </label>
              <div class="mt-2.5">
                <input
                  type="text"
                  name="company"
                  id="company"
                  value={formData.company}
                  required
                  autocomplete="organization"
                  placeholder="Your company name"
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-accent-orange placeholder:text-secondary-light focus:ring-2 focus:ring-inset focus:ring-accent outline-none"
                />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label
                htmlFor="type-of-qury"
                class="block text-sm font-semibold leading-6"
              >
                Type of query{" "}
                <span className="text-accent-orange text-[1.15rem]">*</span>
              </label>
              <Select options={options} selected={selectedItem} required />
            </div>
            {/* Payment information */}
            {/* {selectedItem.selectedItem.text !== options[0].text &&
            selectedItem.selectedItem.text !== options[1].text &&
            selectedItem.selectedItem.text !== options[5].text ? (
              <div className="shadow-accent-orange shadow-md rounded-md px-5 sm:col-span-2">
                <h3 className="mt-3 mb-5 text-2xl font-extrabold text-accent-orange">
                  Invoicing details
                </h3>

                <div class="w-full mb-4">
                  <label
                    htmlFor="companyCountry"
                    class="block text-sm font-semibold leading-6"
                  >
                    Country{" "}
                    <span className="text-accent-orange text-[1.15rem]">*</span>
                  </label>
                  <div class="mt-2.5">
                    <input
                      type="text"
                      name="companyCountry"
                      id="companyCountry"
                      value={formData.companyCountry}
                      required
                      autocomplete="country"
                      placeholder="Country in the company address"
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-accent-orange placeholder:text-secondary-light focus:ring-2 focus:ring-inset focus:ring-accent outline-none"
                    />
                  </div>
                </div>
                <div class="w-full mb-4">
                  <label
                    htmlFor="companyCity"
                    class="block text-sm font-semibold leading-6"
                  >
                    City{" "}
                    <span className="text-accent-orange text-[1.15rem]">*</span>
                  </label>
                  <div class="mt-2.5">
                    <input
                      type="text"
                      name="companyCity"
                      id="companyCity"
                      value={formData.companyCity}
                      required
                      autocomplete="street-address"
                      placeholder="City in the company address"
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-accent-orange placeholder:text-secondary-light focus:ring-2 focus:ring-inset focus:ring-accent outline-none"
                    />
                  </div>
                </div>
                <div class="w-full mb-4">
                  <label
                    htmlFor="companyStreet"
                    class="block text-sm font-semibold leading-6"
                  >
                    Street{" "}
                    <span className="text-accent-orange text-[1.15rem]">*</span>
                  </label>
                  <div class="mt-2.5">
                    <input
                      type="text"
                      name="companyStreet"
                      id="companyStreet"
                      value={formData.companyStreet}
                      required
                      autocomplete="street-address"
                      placeholder="Street in the company address"
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-accent-orange placeholder:text-secondary-light focus:ring-2 focus:ring-inset focus:ring-accent outline-none"
                    />
                  </div>
                </div>
                <div class="w-full mb-4">
                  <label
                    htmlFor="companyPostal"
                    class="block text-sm font-semibold leading-6"
                  >
                    Postal code{" "}
                    <span className="text-accent-orange text-[1.15rem]">*</span>
                  </label>
                  <div class="mt-2.5">
                    <input
                      type="text"
                      name="companyPostal"
                      id="companyPostal"
                      value={formData.companyPostal}
                      required
                      autocomplete="postal-code"
                      placeholder="XXX XX"
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-accent-orange placeholder:text-secondary-light focus:ring-2 focus:ring-inset focus:ring-accent outline-none"
                    />
                  </div>
                </div>
                <div class="w-full mb-4">
                  <label
                    htmlFor="ico"
                    class="block text-sm font-semibold leading-6"
                  >
                    ICO{" "}
                    <span className="text-accent-orange text-[1.15rem]">*</span>
                  </label>
                  <div class="mt-2.5">
                    <input
                      type="text"
                      name="ico"
                      id="ico"
                      value={formData.ico}
                      required
                      placeholder="12345678"
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-accent-orange placeholder:text-secondary-light focus:ring-2 focus:ring-inset focus:ring-accent outline-none"
                    />
                  </div>
                </div>
                <div class="w-full mb-4">
                  <label
                    htmlFor="dic"
                    class="block text-sm font-semibold leading-6"
                  >
                    DIC{" "}
                    <span className="text-accent-orange text-[1.15rem]">*</span>
                  </label>
                  <div class="mt-2.5">
                    <input
                      type="text"
                      name="dic"
                      id="dic"
                      value={formData.dic}
                      required
                      placeholder="1234567890"
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-accent-orange placeholder:text-secondary-light focus:ring-2 focus:ring-inset focus:ring-accent outline-none"
                    />
                  </div>
                </div>
                <div class="w-full mb-4">
                  <label
                    htmlFor="vat-payer"
                    class="block text-sm font-semibold leading-6"
                  >
                    VAT payer?{" "}
                    <span className="text-accent-orange text-[1.15rem]">*</span>
                  </label>
                  <Radio
                    title={"VAT payer?"}
                    radioBtns={vatBtns}
                    selected={{ selected: vatPayer, setSelected: setVatPayer }}
                  />
                </div>
              </div>
            ) : (
              ""
            )} */}

            <div class="sm:col-span-2">
              <label
                htmlFor="message"
                class="block text-sm font-semibold leading-6 text-gray-900"
              >
                Message
              </label>
              <div class="mt-2.5">
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-accent-orange placeholder:text-secondary-light focus:ring-2 focus:ring-inset focus:ring-accent outline-none"
                >
                  {formData.message}
                </textarea>
              </div>
            </div>
          </div>
          <div class="mt-5">
            <div class="text-accent-orange text-center pb-1 text-sm">
              By clicking Submit you agree to our{" "}
              <Link href="/privacy" className="hover:text-primary-dark">
                Privacy Policy
              </Link>
            </div>
            {loading ? (
              <Spinner />
            ) : (
              <>
                {/* {isMounted && (
                  <PopupButton
                    url="https://calendly.com/scaleup-tools/30min"
                    rootElement={document.getElementById("root")}
                    text="Choose a time"
                    prefill={{
                      email: formData.email,
                      name: formData.name,
                    }}
                    className="block w-[60%] mx-auto px-8 mb-5 font-semibold uppercase py-2 border border-b-accent-orange rounded text-white bg-accent-orange hover:bg-white hover:text-accent-orange hover:border-accent-orange active:border-primary-dark active:text-primary-dark"
                  />
                )} */}
                <ReCAPTCHA
                  className="flex justify-center my-5"
                  sitekey="6LfisHgkAAAAACqvku973gYX3XBdVtTzOx-j3kiw"
                  onChange={(event) => setCaptcha(event)}
                  onErrored={() => setCaptcha("")}
                  onExpired={() => setCaptcha("")}
                />
                <button
                  type="submit"
                  class="block w-[60%] mx-auto px-8 font-semibold uppercase py-2 border border-b-accent-orange rounded text-white bg-accent-orange hover:bg-white hover:text-accent-orange hover:border-accent-orange active:border-primary-dark active:text-primary-dark"
                >
                  Submit
                </button>
              </>
            )}
          </div>
        </form>
        <DialogWindow response={{ response, setResponse }} />
      </div>
    </div>
  );
}

export default Form;
