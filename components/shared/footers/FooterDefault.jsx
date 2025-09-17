import React from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import FooterWidgets from './modules/FooterWidgets';
import FooterLinks from './modules/FooterLinks';
import FooterCopyright from './modules/FooterCopyright';

const FooterDefault = () => (
    <footer>
    <div className="ftBorder"></div>
    <div className="container">
    <div className="footerTop">
    <div className="row">
    <FooterWidgets />


</div>
</div>
</div>
</footer>
);

export default FooterDefault;
