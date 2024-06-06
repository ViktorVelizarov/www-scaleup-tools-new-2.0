import "../styles/globals.css";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { getCookie } from "cookies-next";
import Script from "next/script";

import DefaultLayout from '@/Layouts/DefaultLayout';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const consent = getCookie("localConsent") === "true";
  return (
    <SessionProvider session={session}>
      <Head>
        <title>SCALEUP. TOOLS</title>
        <meta name="description" content="Scaleup support" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SessionProvider session={session}>
        <Script
          id="gtag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

           gtag('consent', 'default', {
              'ad_storage': 'granted',
              'analytics_storage': 'granted'
            });

            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MZTBSV7M');
          `,
          }}
        />
        {consent === true && (
          <>
            {console.log("inserting true for cookies")}
            <Script
              id="consupd"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
            gtag('consent', 'update', {
              'ad_storage': 'granted',
              'analytics_storage': 'granted'
            });
          `,
              }}
            />
          </>
        )}
          <DefaultLayout>
        <Component {...pageProps} />
        </DefaultLayout>
      </SessionProvider>
    </SessionProvider>
  );
}
