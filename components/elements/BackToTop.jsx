import React, { useEffect, useState } from 'react'

const BackToTop = () => {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
       
        if (scrolled > 300){
          setVisible(true)
        } 
        else if (scrolled <= 300){
          setVisible(false)
        }
      };

      const scrollToTop = () =>{
        window.scrollTo({
          top: 0, 
          behavior: 'smooth'
        });
      };
      useEffect(()=>{

        window.addEventListener('scroll', toggleVisible);

      },[])
     

  return (
    <div>
       <div  
            id="whatsapp"        >
              <a href='https://wa.me/918604154810' target='_blank' title='WhatsApp'><img src={"/static/img/WhatsApp.png"} alt='whatsapp'/></a>
            </div>

      <div
      style={{display: visible ? 'inline' : 'none'}}
                id="back2top"
                className="ps-btn--back-to-top"
                onClick={e =>scrollToTop(e)}>
                <i className="icon-chevron-up"></i>

                
            </div>
      </div>
  )
}

export default BackToTop


