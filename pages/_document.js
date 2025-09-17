// import Document, { Html, Head, Main, NextScript } from 'next/document'
// import Script from 'next/script'
// class WebDocument extends Document {
//   render() {
//     return (
//       <Html lang="en-US">
//         <Head>
//         <Script strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
//         new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
//         j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
//         'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
//         })(window,document,'script','dataLayer','GTM-NNKC4N4');`}}></Script>
//         </Head>
//         <body>
//             <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NNKC4N4"
//             height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}></noscript>
//           <Main/>
//           <NextScript />
//         </body>
//       </Html>
//     )
//   }
// }
// export default WebDocument

import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import { gtmCode } from '../api/url'
class WebDocument extends Document {
    render() {
        return (
            <Html lang="en-US">
                <Head>
                    {/* <script>
                        async
                        src=`https://www.googletagmanager.com/gtm.js?id=${gtmCode}`
                    </script> */}
                    <script id="gtm-script" strategy="afterInteractive" dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NNKC4N4');`}}></script>
<meta name="google-site-verification" content="eIHkNyRCyVY3nWRkcx8EoEDdZ8GwzOwjeuwA9V5pL2w" />
{/* <script async src="https://www.googletagmanager.com/gtag/js?id=AW-622583353"></script>
<script strategy="afterInteractive" dangerouslySetInnerHTML={{
__html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);} 
gtag('js', new Date()); 
gtag('config', 'AW-622583353');`}}>



</script>
<script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-4E7NR5C0RE`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4E7NR5C0RE',{ 'debug_mode': true });
            gtag('config', 'G-4E7NR5C0RE', {
              page_path: window.location.pathname,
            });
          `,
            }}
          /> */}

                </Head>
                <body>
                    <noscript dangerouslySetInnerHTML={{
                        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NNKC4N4"
                        height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}></noscript>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
export default WebDocument