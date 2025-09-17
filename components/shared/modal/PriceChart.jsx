import React from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import Modal from 'react-modal';



export default function PriceChartPop({showPriceModal,setShowPriceModal,priceChartInfo}){


    const customStyles = {
        content : {
          top                   : '20%',
          left                  : '33%',
          right                 : '33%',
          bottom                : 'auto',
          overflow:"auto"
        //   marginRight           : '-50%',
        //   transform             : 'translate(-13%, -13%)'
        }
      };

      const closeModal=(e)=>{
          setShowPriceModal(false)

      }

    return(
        <Modal
          isOpen={showPriceModal}
        //   onAfterOpen={afterOpenModal}
          onRequestClose={e=>closeModal(e)}
          style={customStyles}
          contentLabel="Example Modal"
        >

            <div className="price-chart-container">
                <h2>Tier Price chart
                <button onClick={e=>closeModal(e)}>X</button></h2>

                <div className="price-chart-table">
                    <table>
                        <tr>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                        {priceChartInfo.map((price,index)=>{
                            return(
                        <tr key={index}>
                            <td>{price.quantity}</td>
                            {/* <td>$36000 (per unit = $9000.00)</td> */}
                        <td>${price.quantity*price.price} (per unit = ${price.price})</td>
                        </tr>
                            )
                        })}
                        
                    </table>

                </div>

            </div>


        </Modal>
    )
}
