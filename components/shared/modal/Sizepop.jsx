 import React from 'react';
// import Modal from 'react-modal';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';

function SizePopup({showPop,setShowPop}) {
  const product = useSelector((s) => s.product.singleProduct);


    // const customStyles = {
    //     overlay: {
    //         position: 'fixed',
    //         top: 0,
    //         left: 0,
    //         right: 0,
    //         bottom: 0,
    //         background: 'transparent',
    //         height:"500px"

    //       },
    //     content : {
    //       top                   : '0',
    //       left                  : '15%',
    //       right                 : '25%',
    //       bottom                : '2%',
    //       marginRight           : '3%',
    //       marginTop             : '2%',
    //       padding: '5%',
    //       overflow:"hidden",

       
    //     }
    //   };

      const data = (product.keywords).split("~")
      const [chart] = data;

      const chartval = (data.filter(item => (item).toUpperCase() == "FOOTWEAR"))[0];
      const chartVal1 = (data.filter(item => (item).toUpperCase() == "GARMENTS"))[0];
    const closeModal=()=>{
        setShowPop(false)
    }

return (
  <>
   <Modal
    open={showPop}
    onCancel={e=>closeModal(e)}
    footer={null}
    width={1000}
    height={500}
        // style={customStyles}
    // contentLabel="Example Modal"
  >         
   {/* <div className='sizepop-close' onClick={e=>closeModal(e)}>X</div> */}
   {(chartval && chartval.toUpperCase())=='FOOTWEAR' &&
         <div>
          <img src={"/static/img/size-chart.jpg"} alt="size chart"/>
    </div>}
    {(chartVal1 && chartVal1.toUpperCase())=='GARMENTS' &&
      <div>
          <img src={"/static/img/Shirt-chart.jpg"} alt="size chart"/>
    </div>}
  </Modal></>)
   
}

export default SizePopup
