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

// import Link from "next/link";
// import React from "react";
// import styles from "./FooterDefault.module.scss";

// export default function FooterDefault() {
//   return (
//     <footer className={styles.footer}>
//       <div className={styles.topBar}></div>

//       <div className={styles.footerContent}>
//         <div className={styles.leftSection}>
//           <h1>L. Verma</h1>
//         </div>

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
//             <Link href="/privacy-policy">
//               <p className={styles.link}>Privacy Policy</p>
//             </Link>

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

import React from "react";
import Link from "next/link";
import styles from "./FooterDefault.module.scss";

/**
 * FooterDefault
 * - Responsive layout that matches the provided design:
 *   large left text block, 3 columns of links, right-hand app badges + description,
 *   thin divider and bottom row with small links + social icons.
 */
export default function FooterDefault() {
  return (
    <footer className={styles.footer}>
      {/* Top dark strip (accent) */}
      <div className={styles.topBar} />

      <div className={styles.inner}>
        {/* Left big intro */}
        <div className={styles.leftBlock}>
          <h2 className={styles.title}>Buy Eyewear from VSpecs</h2>
          <p className={styles.intro}>
            VSpecs SOLUTIONS LIMITED (Earlier known as VSpecs Solutions Private
            Limited) is a technology-driven eyewear company, with a belief that
            clear vision is fundamental to personal development and well-being.
            Our aim is to build tech-enabled supply and distribution solutions
            that improve access to affordable and quality Eyewear for All.
          </p>
          <p className={styles.introSmall}>
            We sell a wide range of eyewear products including prescription{" "}
            <Link href="#">
              <a>eyeglasses</a>
            </Link>
            ,{" "}
            <Link href="#">
              <a>sunglasses</a>
            </Link>
            , and other products such as{" "}
            <Link href="#">
              <a>contact lenses</a>
            </Link>{" "}
            and eyewear accessories. Our brands are designed to be aspirational
            and appeal to a wide range of customer segments.
          </p>
        </div>

        {/* Middle columns */}
        <div className={styles.columns}>
          <div className={styles.col}>
            <h4>Services</h4>
            <ul>
              <li>
                <Link href="#">
                  <a>Store Locator</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a>Buying Guide</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a>Frame Size</a>
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4>About Us</h4>
            <ul>
              <li>
                <Link href="#">
                  <a>We Are Hiring</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a>Refer And Earn</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a>VSpecs Coupons</a>
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4>Help</h4>
            <ul>
              <li>
                <Link href="#">
                  <a>FAQ's</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a>Grievance Redressal</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a>Cardemi</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Right - app badges & description */}
        <div className={styles.rightBlock}>
          <div className={styles.badges}>
            {/* Replace these with real badge images in your static folder */}
            <img
              src="/static/img/google-play-badge.png"
              alt="Google Play"
              className={styles.badge}
            />
            <img
              src="/static/img/app-store-badge.png"
              alt="App Store"
              className={styles.badge}
            />
          </div>

          <p className={styles.badgeText}>
            Download VSpecs App to buy <br />
            Eyeglasses, Sunglasses and Contact Lenses
          </p>
        </div>
      </div>

      {/* Thin divider */}
      <div className={styles.divider} />

      {/* Bottom row */}
      <div className={styles.bottom}>
        <div className={styles.bottomLeft}>
          <nav className={styles.smallNav}>
            <Link href="#">
              <a>T &amp; C</a>
            </Link>
            <Link href="/privacy">
              <a>Privacy</a>
            </Link>
            <Link href="#">
              <a>Disclaimer</a>
            </Link>
            <Link href="#">
              <a>Cookie Settings</a>
            </Link>
          </nav>
        </div>

        <div className={styles.bottomRight}>
          <div className={styles.versionFollow}>
            <span className={styles.version}>Version 1.0.0</span>
            <span className={styles.sep}>||</span>
            <span className={styles.follow}>Follow Us</span>
          </div>

          <div className={styles.socialIcons}>
            {/* use svg/icons from your assets or fontawesome */}
            <a href="#" aria-label="facebook" className={styles.social}>
              F
            </a>
            <a href="#" aria-label="instagram" className={styles.social}>
              I
            </a>
            <a href="#" aria-label="twitter" className={styles.social}>
              T
            </a>
          </div>
        </div>
      </div>

      {/* Floating whatsapp button */}
      <a
        className={styles.whatsapp}
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
      >
        <img src="/static/img/whatsapp-icon.png" alt="WhatsApp" />
      </a>
    </footer>
  );
}
