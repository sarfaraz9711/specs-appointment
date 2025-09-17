import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { colorShowContent, colorThemeCurrent,viewcolorThemeCurrent } from '../../../store/colorPalette/action';
//import {ConnectPlugin} from '../../../components/connectPlugins';

function ThemeChanger(){
    let showClass=useSelector(s=>s.palette.showContent)
    let showpannelonlyopen = useSelector(s=>s.palette.viewpannel)


    
   const dispatch = useDispatch()
   useEffect(()=>{
    dispatch(colorShowContent(""))
   },[])

   const handleThemeChange=(color)=>{
    showClass==="color-show"?dispatch(colorShowContent("")):dispatch(colorShowContent("color-show"))
       localStorage.setItem("colorThemeSpurt",color)
       localStorage.setItem("colorThemeSpurtView",color+"color")
       dispatch(colorThemeCurrent(color))
       dispatch(viewcolorThemeCurrent(color+"color"))
    
   }

   const display = "blockblock"
    return(
        <div className={`colorOption transistionColor d-none`}>
            
            <button className="button-palette" onClick={e=>showClass==="color-show"?dispatch(colorShowContent("")):dispatch(colorShowContent("color-show"))}>
                {/* <img src="/static/img/new-color-pallete.png"></img> */}
            </button>
            <div className="palette-color-container">
                <img src="/static/img/polygon17.svg" onClick={e=>handleThemeChange("blue")}/>
                <img src="/static/img/polygon18.svg" onClick={e=>handleThemeChange("red")}/>
                <img src="/static/img/polygon19.svg" onClick={e=>handleThemeChange("purple")}/>
                <img src="/static/img/polygon20.svg" onClick={e=>handleThemeChange("green")}/>
                <img src="/static/img/polygon21.svg" onClick={e=>handleThemeChange("grey")}/>
                <img src="/static/img/polygon22.svg" onClick={e=>handleThemeChange("normal")}/>

                
            </div>

    </div>
    )
    


}
export default ThemeChanger