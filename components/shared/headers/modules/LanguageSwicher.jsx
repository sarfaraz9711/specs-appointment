import React, {useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { imageUrl } from '../../../../api/url';
import { withTranslation } from '../../../../i18n'
import { LanguageListLoading } from '../../../../store/wishlist/action';
//import {ConnectPlugin} from '../../../connectPlugins';

function LanguageSwicher({ t, i18n }) {
  const dispatch =useDispatch()
    const [currentLang, setCurrentLang] = useState('')
    const [countryFlag, setCountryFlag] = useState('')
    let coutryf=useSelector(s=>s.wishlist.langagechange)
    let countflagcout=useSelector(s=>s.wishlist.mainloadedone)
    

useEffect(() => {
    // JSON.stringify
   let  lagnchange =  JSON.parse(localStorage.getItem("language-spurt"))
   
                if (lagnchange !== null) {
                    // let lagnchange=localStorage.getItem("language-spurt")
                    if (lagnchange.code === 'eng') {
                        dispatch(LanguageListLoading(imageUrl+"?path="+lagnchange.imagePath+"&name="+lagnchange.image+"&width=20&height=20"))
                        setCurrentLang(lagnchange.name)
                        // setCountryFlag(imageUrl+"?path="+cout.imagePath+"&name="+cout.image+"&width=20&height=20")
                        setCountryFlag(imageUrl+'?path=language/&name=Img_1622893818038.png&width=20&height=20')
                        i18n.changeLanguage('en')
                    }else if(lagnchange.code === 'fr'){
                        dispatch(LanguageListLoading(imageUrl+"?path="+lagnchange.imagePath+"&name="+lagnchange.image+"&width=20&height=20"))
                        setCurrentLang(lagnchange.name)
                        // setCountryFlag(imageUrl+"?path="+cout.imagePath+"&name="+cout.image+"&width=20&height=20")
                        setCountryFlag(imageUrl+'?path=language/&name=Img_1557569207176.png&width=20&height=20')
                        i18n.changeLanguage('fr')

                    }else{
                        console.log(lagnchange,'localStorage.getItem("language-spurt").name')
                        
                            setCurrentLang(lagnchange.name)
                        
                            dispatch(LanguageListLoading(imageUrl+"?path="+lagnchange.imagePath+"&name="+lagnchange.image+"&width=20&height=20"))
                            // dispatch(LanguageListLoading(imageUrl+'?path=language/&name=Img_1622893818038.png&width=20&height=20'))
                            
                            setCountryFlag(imageUrl+'?path=language/&name=Img_1622893818038.png&width=20&height=20')
                            i18n.changeLanguage('en')
                        
                    }
                    
                }
                else {
                    if(countflagcout&&countflagcout.length !==0){
                        console.log(countflagcout,'countflagcout');
                        setCurrentLang(countflagcout.at(0).name )
                    
                        dispatch(LanguageListLoading(imageUrl+"?path="+countflagcout.at(0).imagePath+"&name="+countflagcout.at(0).image+"&width=20&height=20"))
                        // dispatch(LanguageListLoading(imageUrl+'?path=language/&name=Img_1622893818038.png&width=20&height=20'))
                        
                        setCountryFlag(imageUrl+'?path=language/&name=Img_1622893818038.png&width=20&height=20')
                        i18n.changeLanguage('en')
                    }
                    
                }
      

    }, [countflagcout])

    

   
    // const onChangeLanguage = (language, e, current) => {
        const onChangeLanguage = (e,datas) => { 

    countflagcout&&countflagcout.map((equaldata,inex)=>{
               
       if(equaldata.languageId===datas.languageId){
           //  e.preventDefault();

       
        
      
    
        if (datas.code === 'eng') {
            // setCurrentLang('english')
            setCurrentLang(datas.name)
            i18n.changeLanguage('en');
          //  dispatch(LanguageListLoading(imageUrl+"?path="+datas.imagePath+"&name="+datas.image+"&width=20&height=20"))
            setCountryFlag(imageUrl+"?path="+datas.imagePath+"&name="+datas.image+"&width=20&height=20")
          
            localStorage.setItem("language-spurt",JSON.stringify(datas))

        }else if(datas.code === 'fr'){
            setCurrentLang(datas.name)
            i18n.changeLanguage('fr');
            dispatch(LanguageListLoading(imageUrl+"?path="+datas.imagePath+"&name="+datas.image+"&width=20&height=20"))
            setCountryFlag(imageUrl+"?path="+datas.imagePath+"&name="+datas.image+"&width=20&height=20")
            localStorage.setItem("language-spurt", JSON.stringify(datas))
        }
       else{
            setCurrentLang(datas.name)
            // i18n.changeLanguage('fr');
          //  dispatch(LanguageListLoading(imageUrl+"?path="+datas.imagePath+"&name="+datas.image+"&width=20&height=20"))
            setCountryFlag(imageUrl+"?path="+datas.imagePath+"&name="+datas.image+"&width=20&height=20")
        }

       }  
        
    })
        
    };

  

    

    return (
        
        <div className="ps-dropdown language">
    
           
           {coutryf&&<><a href="#" onClick={(e) => e.preventDefault()}>
                <img src='/static/img/flag.png' alt="martfury" />{currentLang} </a></>}
               

           

            <ul className="ps-dropdown-menu">
            {countflagcout&&countflagcout.map((flagcout,key)=>(
                 <>
           

                <li>
                    
                    {/* <img
                        src={
                          imageUrl +
                          "?path=" +
                          flagcout.imagePath+
                          "&name=" +
                          flagcout.image +
                          "&width=20&height=20"
                          
                        }
                        style={{ width: "25px!important", height: "13px!important" }} 
                        alt="martfury"
                      /> */}
                  
                      <input type="radio" key={key} value={flagcout.name} id={flagcout.languageId} onChange={(e) => onChangeLanguage(e,flagcout)} checked={currentLang === flagcout.name} />
                
                    <label htmlFor={flagcout.languageId} >{flagcout.name}</label>
                   
                    
                    

                </li>

              

           
            </>
        ))}
 </ul>
         
        </div>
    );

}

export default withTranslation("common")(LanguageSwicher);

