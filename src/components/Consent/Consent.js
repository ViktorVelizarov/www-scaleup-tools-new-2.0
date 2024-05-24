import React, { useState, useEffect } from "react";
import { setCookie, hasCookie } from "cookies-next";

function Consent() {
  // consent popup visibility
  const [consent, setConsent] = useState(true);

  useEffect(() => {
    console.log();
    setConsent(hasCookie("localConsent"));
  }, []);

  const acceptCookie = () => {
    setConsent(true);
    setCookie("localConsent", "true", { maxAge: 60 * 60 * 24 * 365 });
    gtag("consent", "update", {
      ad_storage: "granted",
      analytics_storage: "granted",
    });
    console.log("accepting cookies");
  };

  const closeConsent = () => {
    setConsent(true);
    console.log("closing consent popup");
  };

  const denyCookie = () => {
    setConsent(true);
    setCookie("localConsent", "false", { maxAge: 60 * 60 * 24 * 365 });
    console.log("denying cookies");
  };

  if (consent === true) {
    return null;
  } else {
    return (
      <div className="fixed bg-accent-orange text-xs md:text-sm inset-x-0 bottom-0 flex justify-between items-center px-5 py-2 text-white z-20 flex-wrap gap-3">
        This site uses cookies, please accept them for a smoother, more tailored
        browsing experience.
        <div className="flex gap-5">
          {/* <button
            className="border-white border-[1px] py-0.5 px-2 rounded-md text-white hover:bg-white hover:text-accent-orange"
            onClick={closeConsent}
          >
            Close
          </button> */}
          <button
            className="border-white border-[1px] py-0.5 px-2 rounded-md text-white hover:bg-white hover:text-accent-orange"
            onClick={denyCookie}
          >
            Deny
          </button>
          <button
            className="border-white border-[1px] py-0.5 px-2 rounded-md text-white hover:bg-white hover:text-accent-orange"
            onClick={acceptCookie}
          >
            Accept
          </button>
        </div>
      </div>
    );
  }
}

export default Consent;
