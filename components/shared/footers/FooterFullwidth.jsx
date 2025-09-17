import React from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import FooterWidgets from './modules/FooterWidgets';
import FooterLinks from './modules/FooterLinks';
import FooterCopyright from './modules/FooterCopyright';

const FooterFullwidth = () => (
    <footer>
    <div className="ftBorder"></div>
    <div className="container">
    <div className="footerTop">
    <div className="row">
    <FooterWidgets />


</div>
</div>
</div>
  {/* <div class="copyText">
  <a href="#" title="Privacy Policy">Privacy Policy </a>  |  <a href="#" title="Terms & Conditions">Terms & Conditions</a>
  <br />
  <span> &copy; 2022 Leayan Global Pvt. Ltd.</span>
   </div> */}
</footer>
);

export default FooterFullwidth;
