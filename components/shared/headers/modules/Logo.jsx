import Link from 'next/link'
import React from 'react'
import { imageUrl } from '../../../../api/url';
import { useSelector } from 'react-redux';

export default function Logo() {
  const logopaths=useSelector(s=>s.setting.footerDet)

  return (
  <>
  <Link href="/">
              <a className="ps-logo">
                <div className="logo-div">
                  {logopaths&&logopaths&&  <img
                        // src={
                        //  "http://localhost:4200/assets/img/header-icons/red-chief-logo.png"
                        // }
                        src={
                          "/static/img/red-chief-logo.png"
                        }
                         alt="redchief"
                      />}
              
                 
                </div>
              </a>
            </Link>
  </>
  )
}
