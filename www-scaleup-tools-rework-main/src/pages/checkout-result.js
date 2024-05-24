import { useState, useEffect } from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import Link from "next/link";
import axios from "axios";

const Home = () => {
  const [result, setResult] = useState("");  

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    console.log("QUERY:");
    console.log(query);
    if(query.get("success")){
      setResult("We have accepted your payment. We will contact you soon.");
    }else if (query.get("canceled")) {
      setResult("Something went wrong. Try again later.");
      console.log(query.get("transactionId"));
      const id = query.get("transactionId")
      axios
        .post("/api/calendly/cancelCalendlyBooking", {id: id})
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [])

  return (
    <DefaultLayout>
      <div className="bg-accent-orange h-[75vh] flex flex-col justify-center px-[10%] md:px-[25%]"> 
        <h1 className="text-5xl font-extrabold text-white">{result}</h1>
        <Link className="block mt-12 px-5 py-3 bg-white font-semibold border-white border-2 text-accent-orange rounded-md text-center w-[15rem] hover:text-white hover:bg-accent-orange" href="/">Back Home</Link>
      </div>
    </DefaultLayout>
  );
}
export default Home;
