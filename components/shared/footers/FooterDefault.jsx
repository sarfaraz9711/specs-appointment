// import React from 'react';
// //import {ConnectPlugin} from '../../connectPlugins';
// import FooterWidgets from './modules/FooterWidgets';
// import FooterLinks from './modules/FooterLinks';
// import FooterCopyright from './modules/FooterCopyright';

// const FooterDefault = () => (
//     <footer>
//     <div className="ftBorder"></div>
//     <div className="container">
//     <div className="footerTop">
//     <div className="row">
//     <FooterWidgets />

// </div>
// </div>
// </div>
// </footer>
// );

// export default FooterDefault;

// import React from "react";
// import styles from "./FooterDefault.module.scss";

// export default function FooterDefault() {
//   return (
//     <footer className={styles.footer}>
//       {/* Top Blue Bar */}
//       <div className={styles.topBar}></div>

//       {/* Main Footer Content */}
//       <div className={styles.footerContent}>
//         {/* LEFT SIDE */}
//         <div className={styles.leftSection}>
//           <h1>L. Verma</h1>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className={styles.rightSection}>
//           <div className={styles.contactBlock}>
//             <p>500 Terry Francine Street</p>
//             <p>San Francisco, CA 94158</p>
//           </div>

//           <div className={styles.contactBlock}>
//             <p>info@mysite.com</p>
//             <p>123 456 7890</p>
//           </div>

//           <div className={styles.linkBlock}>
//             <p>Privacy Policy</p>
//             <p>Accessibility Statement</p>
//           </div>

//           <div className={styles.copyBlock}>
//             <p>© 2035 by L. Verma</p>
//             <p>
//               Powered and secured by <a href="#">Wix</a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

import Link from "next/link";
import React from "react";
import styles from "./FooterDefault.module.scss";

export default function FooterDefault() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topBar}></div>

      <div className={styles.footerContent}>
        <div className={styles.leftSection}>
          <h1>L. Verma</h1>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.contactBlock}>
            <p>500 Terry Francine Street</p>
            <p>San Francisco, CA 94158</p>
          </div>

          <div className={styles.contactBlock}>
            <p>info@mysite.com</p>
            <p>123 456 7890</p>
          </div>

          <div className={styles.linkBlock}>
            <Link href="/privacy-policy">
              <p className={styles.link}>Privacy Policy</p>
            </Link>

            <p>Accessibility Statement</p>
          </div>

          <div className={styles.copyBlock}>
            <p>© 2035 by L. Verma</p>
            <p>
              Powered and secured by <a href="#">Wix</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
