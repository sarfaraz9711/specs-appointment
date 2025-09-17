import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withTranslation } from '../../../../i18n'
import APIServices from '../../../../services'
import { imageUrl } from '../../../../api/url';
function LanguageSwicherProcess9() {

    const [selectedLang, setSelectedLang] = useState('en-in');
    const [activeLanguages, setActiveLanguages] = useState([]);
    let coutryf = useSelector(s => s.wishlist.langagechange)


    const callGetActiveLang = async() => {
        // const result= await APIServices.getAll('list/get-active-languages');
        const result= {data:{
            "status": 200,
            "message": "Data found Successfully",
            "data": [
                {
                    "name": "English",
                    "code": "eng",
                    "image": "indian-flag.png",
                    "image_path": "language/",
                    "redirect_url": "https://redchief.in"
                },
                {
                    "name": "Hindi",
                    "code": "hindi",
                    "image": null,
                    "image_path": null,
                    "redirect_url": "https://hindi.redchief.in"
                }
            ]
        }}
        console.log(result, "Nero ssssss")
        if(result&&result.data&&result.data.status===200){
    
            setActiveLanguages(result.data.data)
          
        }
    }

    
    useEffect(() => {

        if (typeof window !== 'undefined') {
            console.log(window.location, "Nero langssss")
            var strSubdomain = window.location.hostname.split(".");
            var curLang = strSubdomain[0];
            if (strSubdomain && strSubdomain.length > 2) {
                setSelectedLang(curLang);
            } else {
                setSelectedLang('en-in');
            }
        }

    }, [])

    useEffect(()=>{
callGetActiveLang();
    }, [])
    const langArray = [
        {
            title: "English",
            code: "en-in",
            url: "http://rclocal.com"
        },
        {
            title: "Hindi",
            code: "hi",
            url: "http://hi.rclocal.com"
        }
    ];
    const ChangeLanguage = (e) => {
        setSelectedLang(e.target.value);
        const selectedLang = activeLanguages && activeLanguages.filter((item) => item.code == e.target.value)
        window.location = selectedLang[0].redirect_url;
        


    }

    return (

        <li id="p9divmenu" className="ps-dropdown language">
            {/* <script src="…/p9_language.js"></script> */}
            <img src="/static/img/flag.png" alt="martfury" />
            <select value={selectedLang} id="P9LngDdl" onChange={(e) => { ChangeLanguage(e) }} class="language">
                {activeLanguages && activeLanguages.map((item) => {
                    return <option value={item.code}>{item.name}</option>
                })}
            </select>
        </li >
    );

}

export default withTranslation("common")(LanguageSwicherProcess9);

