import React  from 'react';
import { useEffect, useState } from 'react';
import AccountNav from '../../elements/AccountNav';
import Head from 'next/head'
import { getUserCreditNote } from '../../../api/account/creditNote';
import Loader from '../../shared/Loader';
import moment from 'moment';

function Creditnoteoffer() {
    const [data, setData] = useState("")
    const [isLoaderActive, setLoaderActive]=useState(false)
    const [getActCreditData, setActCreditData]=useState([])
    const [activeTabClass, setActiveTabClass] = useState('credit-note-undeline');
    const [selectedTabClass, setSelectedTabClass] = useState('');

     useEffect(()=>{
        getUserCreditNoteDate()
     },[])

const getUserCreditNoteDate = async ()=>{
    setLoaderActive(true)
    const result = await getUserCreditNote()
    console.log("result",result)
    if(result){
        const filterData = result.filter(item=>item.actStatus=='Active')
        setData(filterData)
        setActCreditData(result)
        setLoaderActive(false)
    }
}

     const creditNoteFilter = (data)=>{
        console.log(data, 'neerasdfsfdsf')
        console.log("getActCreditData",getActCreditData)
        setSelectedTabClass(data);
        const filterData = getActCreditData.filter(item=>item.actStatus==data)
        if(data=="all"){
            setData(getActCreditData)
        }else{
            setData(filterData)        
        }
        }


    return (
        <section className="cus-account-container">
            <div className="cus-account-subcontainer">
                <Head>
                    <title>Credit Note</title>
                    
                </Head>
                
                <div className="cus-position-container">
                    <AccountNav keyValue={11} />
                    <div className='credit-note'>
                    <div className='creditNote'>
                    <div className='account-heading ml-3 mt-3'>Credit Note Details:</div>
                    <div className='coupon-indicator d-flex justify-content-start pl-4 pr-4 mt-3'>
               {selectedTabClass=='pending' || selectedTabClass==''?<div className={`mr-3 coupon-click ${activeTabClass}`} onClick={e=>creditNoteFilter('pending')}><span className='pending'></span> Available</div>:<div className='mr-3 coupon-click' onClick={e=>creditNoteFilter('Active')}><span className='pending'></span> Available</div>}
               {selectedTabClass=='redeem'?<div className={`mr-3 coupon-click ${activeTabClass}`} onClick={e=>creditNoteFilter('redeem')}><span className='redeem'></span> Redeem</div>:<div className='mr-3 coupon-click' onClick={e=>creditNoteFilter('Redeem')}><span className='redeem'></span> Redeem</div>}
               {selectedTabClass=='expired'?<div className={`mr-3 coupon-click ${activeTabClass}`} onClick={e=>creditNoteFilter('expired')}><span className='expired'></span> Expired</div>:<div className='mr-3 coupon-click' onClick={e=>creditNoteFilter('Expired')}><span className='expired'></span> Expired</div>}
               {selectedTabClass=='all'? <div className={`mr-3 coupon-click ${activeTabClass}`} onClick={e=>creditNoteFilter('all')}><span className='all'></span> All Credit Note</div>:<div className='mr-3 coupon-click' onClick={e=>creditNoteFilter('all')}><span className='all'></span>All Credit Note</div>}
                </div>
                    </div>
                    <div className="cus-right-position">
                        <div className="adr-subcontainer">
                            <div className="adr-main-contain">
                                <div>
                
                                </div>
                                <div className='row mt-3 pl-4 pr-4 active-promo-offers'>
{data.length>0?<>
                                    {data && data.map((item, i) => {
                                        return  <div className='col-md-4 mb-5'>
                                        {/* <div className={`coupon`}> */}
                                        <div className={`coupon ${item.couponClass}`}>

                                            <div className="offer-body pl-3 pr-3">
                                               <div><h2 className='heading pt-3'></h2> <p className='free-product'>{item.cn_code}</p><span className='offer-range'>Rs {item.cn_amount}</span></div>
                                            </div>
                                            <div className="offeer-exp pl-3 pr-3">
                                               <p className="expire">Created Date: {moment(item.cn_created_date).format('DD-MM-YYYY')}</p>
                                                <p className="expire">Expires: {moment(item.cn_expiry_date).format('DD-MM-YYYY')}</p>
                                                <p className="expire">CN Status: {item.actStatus}</p>
                                    
                                            </div>
                                        </div>
                                    </div>
                                    })}
                                    </>:
                                    <div className='w-100  text-center alert alert-warning'>No Data Available</div>
                                }
                                </div>

                            </div>

                        </div>

                    </div>
                    </div>
                </div>
        
            </div>
            {isLoaderActive &&<Loader />}
        </section>
    )
}

export default Creditnoteoffer;