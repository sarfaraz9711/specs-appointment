import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import Head from "next/head";
import { Button } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import { Form, Input } from 'antd';
import { useTranslation } from '../i18n';
import { storePincodeApi } from "../api/auth/shopbypincode";
import { getStateListApi } from '../api/auth/getState'
import { getCityListApi, getPincodeApi, getSubDistrictListApi } from "../api/auth/getCity";
import { getLocationListApi } from "../api/auth/getLocation";
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import BreadCrumb from "./elements/BreadCrumb";
import { getStoresByPinCode, getStoresByCity } from '../api/stores';
import Image from 'next/image'

function InformationDefault() {

  const [pin, setPin] = useState("")
  const [pinError, setPinError] = useState("")
  const [pinValid, setPinValid] = useState("");
  const [cityError, setCityError] = useState("")
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [subDist, setSubDist] = useState("")
  const [stateError, setStateError] = useState("");
  const [submit, setSubmit] = useState(0);
  const [getStateDataList, setStateDataList] = useState([])
  const [getDistrictList, setDistrictList] = useState([])
  const [getSubDistList, setSubDistList] = useState([])
  const [addressList, setaddressList] = useState([])
  const [defaultSearch, setDefaultSearch] = useState("pin");
  const [changeOptionTitle, setChangeOptionTitle] = useState('OR search by city');
  const [storeData, setStoreData] = useState([]);
  const { t } = useTranslation('common');

  useEffect(() => {
    getStateListApi(setStateDataList);
  }, [])

  const setDistrict = (e) => {
    const stateValue = e.target.value
    setState(stateValue)
    getCityListApi(stateValue, setDistrictList)
  }

  const setSubDistrict = (e) => {
    const districtValue = e.target.value
    setCity(districtValue)
    getSubDistrictListApi(districtValue, setSubDistList)

  }

  const setSubDistData = (e) => {
    const subDistData = e.target.value
    setSubDist(subDistData)
  }

  const getPincode = (e) => {
    const pincode = e.target.value
    if (pincode.length == 6) {
      getPincodeApi(pincode, setDistrictList, setSubDistList, setState, setCity, setSubDist)
    } else {
      setDistrictList([])
      setSubDistList([])
      setState("")
      setCity("")
      setSubDist("")
    }
  }



  const handleSubmit = async () => {
    console.log(pin, "Nero pin")
    await getStoresByPinCode(pin, setStoreData);
    //return false;
  }

  const handleSubmitByCity = async () => {
    console.log(state, city, "Nero sssssssssssssssspin")
    await getStoresByCity(city, setStoreData);
    //return false;
  }

  const setSearchOption = () => {
    if (defaultSearch == "pin") {
      setDefaultSearch("city")
      setChangeOptionTitle("OR search by pincode")
      setCity('');
      setState('');
    } else {
      setDefaultSearch("pin");
      setChangeOptionTitle("OR search by city")
      setPin("");
    }
  }


  const breadCrumb = [
    {
      text: 'Home',
      url: '/',
    },
    {
      text: 'location of store',
    },
  ];

  return (

    <div>
      <Head>
        <title>All stores</title>
      </Head>
      <BreadCrumb breacrumb={breadCrumb} />
      <div className="bgWhite">
      <div className="store-container">
        <h2>Red Chief Stores</h2>
        {defaultSearch == "pin" && <div className="search-container row">
          <div className="pin-pane col-md-6">
            <input className="pin-search form form-control text-center" placeholder="Enter pincode" onChange={(e) =>setPin(e.target.value)}
              onKeyPress={(e) => {
                
                if (e.code == "Enter") {
                  handleSubmit(e)
                }
              }}
              value={pin} ></input>
            <i class="fa fa-map-marker" aria-hidden="true"></i><button class="btn-storelocator-search no-btn-css" type="submit" id="searchStore" onClick={e => handleSubmit(e)} >SEARCH</button>
          </div>
        </div>}

        {defaultSearch == "city" && <div className="search-container row">
          <div className="select-state" >

            <select className="select-data form-control" onChange={(e) => setDistrict(e)} value={state} name="state">
              <option value="">--Select state--</option>
              {getStateDataList.length > 0 && getStateDataList?.map(st => {
                return (<option value={st?.stateCode}>{st?.stateName}</option>)
              })}
            </select>
            {submit === 1 && state === "" && <div className="error-div">{stateError}</div>}

          </div>

          <div className="select-city ml-4" >

            <select className="select-data form-control" value={city} name="city" onChange={(e) => setSubDistrict(e)}>
              <option value="">--Select city--</option>
              {getDistrictList.length > 0 && getDistrictList?.map(cl => {
                // return <option value={cl.district_code}>{cl.district_name}</option>
                return <option value={cl.cityName}>{cl.cityName}</option>
              })}
            </select>
            {submit === 1 && city === "" && <div className="error-div">{cityError}</div>}
          </div>

          <div className="button-dev">
            <button onClick={e => handleSubmitByCity(e)} className="btn"
            >{t('Search')}</button>
          </div>
        </div>


        }

        <div className="search-by-city mt-3" onClick={(e) => setSearchOption()}>{changeOptionTitle}</div>
      </div>
      <div className="result-container row">
        {storeData && storeData.length > 0 ?
          storeData.map((item) => {
            return <div className="card-wrapper col-md-3" key={item.id}>
              <div className="card mb-5 location-card" >
<div className="text-center">
                <img className="card-img-top" src="/static/img/red-chief-logo.png" alt="me" />
                </div>
                <div className="card-body">
                  <div className="ml-1 flex">
                    <div className="card-title-left font-weight-bold mr-2">Store Name:</div> <div>{item.shopName}</div>

                  </div>
                  <div className="ml-1 flex">
                    <div className="card-title-left font-weight-bold mr-2">Phone:</div> <div>{item.contactNo}</div>
                  </div>
                  <div className="ml-1 flex">

                    <div className="card-title-left font-weight-bold mr-2">Address:</div> <div>{item.address}, {item.storeCity}, {item.storeState}</div>
                  </div>
                  <div className="ml-1 flex">

                    <div className="card-title-left font-weight-bold mr-2">Store Code:</div> <div>{item.storeCode}</div>
                  </div>
                  <div className="ml-1 flex">

                    <div className="card-title-left font-weight-bold mr-2">Date of Opening:</div> <div>{item.storeOpeningDate}</div>
                  </div>
                  <div className="ml-1 flex">
                    <div className="card-title-left font-weight-bold mr-2">Google Location:</div> <a href={item?.googleLocation}>{item.googleLocation && "Location"}</a>
                  </div>
                </div>

              </div>
            </div>
          })
          : <div className="col-md-12 nrf">No Store found</div>
        }
      </div>
      </div>

    </div >

  )


}

export default InformationDefault;
