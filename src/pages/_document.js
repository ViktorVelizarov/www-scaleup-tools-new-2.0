import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="SCALEUP.tools" />
        <meta
          property="og:description"
          content="SCALEUP.tools is your ultimate resource hub for business expansion, promising superior tools, tailored training sessions, and valuable interactions with seasoned professionals. Embrace the power of automation, reduce operational costs, and upskill with our industry experts."
        />
        <meta property="og:image" content="/static/thumbnail.png" />
        <meta property="og:url" content="https://scaleup.agency/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@yourtwitterhandle" />
        <meta name="twitter:title" content="SCALEUP.tools" />
        <meta
          name="twitter:description"
          content="SCALEUP.tools is your ultimate resource hub for business expansion, promising superior tools, tailored training sessions, and valuable interactions with seasoned professionals. Embrace the power of automation, reduce operational costs, and upskill with our industry experts."
        />
        <meta name="twitter:image" content="/static/thumbnail.png" />
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <link rel="icon" href="static/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,300;0,400;0,600;0,700;1,100;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body id="root">
      <noscript
          dangerouslySetInnerHTML={{
            __html: `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MZTBSV7M"
                      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// "https://api.calendly.com/scheduled_events/ff1fcb33-e620-4253-98fc-760d6984269c"
