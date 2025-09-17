import React from 'react';
import Link from 'next/link';
//import {ConnectPlugin}   from "../../connectPlugins";

const ContactInfo = () => (
    <div className="ps-contact-info">
        <div className="container">
            {/* <div className="ps-section__header">
                <h3>Contact Us For Any Questions</h3>
            </div> */}
            <div className="ps-section__content">
                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 ">
                        <div className="ps-block--contact-info">
                                {/* <span>(+004) 912-3548-07</span> */}

                            <h4>ADDRESS:</h4>
                            <p>
                                <a href="mailto:contact@martfury.com">
                                Chennai, India
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 ">
                        <div className="ps-block--contact-info">
                            <h4>PHONE:</h4>
                            <span>9840322505</span>
                            <p>
                                {/* <span>
                                    17 Queen St, Southbank, Melbourne 10560,
                                    Australia
                                </span> */}
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 ">
                        <div className="ps-block--contact-info">
                            <h4>E-MAIL:</h4>
                            <p>
                                <span>support@spurtcommerce.com</span>
                                {/* <a href="#">career@martfury.com</a> */}
                            </p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
);

export default ContactInfo;
