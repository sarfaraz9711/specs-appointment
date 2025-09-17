import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { franchiseApi } from '../api/account/franchise';
import { getStateListApi } from '../api/auth/getState'
import { getCityListApi } from "../api/auth/getCity";
import { modalSuccess, modalWarning } from "../api/intercept";
import ContentLeftMenu from './ContentLeftMenu';
import { useRouter } from 'next/router';
const FranchiseForm = () => {
    const [state, setState] = useState("");

    const [city, setCity] = useState("");
    const [cityError, setCityError] = useState("");
    const [comment, setComment] = useState("");
    const [commentError, setCommentError] = useState("");
    const [submit, setSubmit] = useState(0);
    

    const [getStateDataList, setStateDataList] = useState([])
    const [getDistrictList, setDistrictList] = useState([])

    const [formInputData, setformInputData] = useState({ city: "", state: "", email: "", name: "", area: "", phone: "", store: "", frontage: "", comment: "", occupation: "" });
    const [errorData, setErrorData] = useState({ error: 0 })
    let currentColor = useSelector(s => s.palette.currentColor)


    useEffect(() => {
        getStateListApi(setStateDataList);

    }, [])

    const validateFrom = () => {

        return false;
    }
    const setDistrict = (e) => {
        //console.log(e.target.selectedIndex.getAttribute('isred'), "Neressfsd")
        
        const stateValue = e.target.value
        console.log("satette",e.target.value )
        setState(stateValue)
        getCityListApi(stateValue, setDistrictList)
        setformInputData({ ...formInputData, state: stateValue, stateText: e.nativeEvent.target[e.target.selectedIndex].text });
    }
    const handleSubmit = (e) => {

        e.preventDefault()
        // validateFrom();
        setSubmit(1)

        if (formInputData.name !== "" && formInputData.email !== "" && formInputData.phone !== "" && formInputData.occupation !== "" && formInputData.store !== "" && formInputData.area !== "" && formInputData.state !== "" && formInputData.city !== "") {

            formInputData.state = formInputData.stateText;
            if(isEmailValid(formInputData.email) && isMobileNumberValid(formInputData.phone)){
                franchiseApi(setformInputData, formInputData);
            }else{
                modalWarning('error', "Please enter valid inputs"); 
            }
            

        } else {
            modalWarning('error', "Please fill all mandetory fields");
        }

        
    }

    const isEmailValid = (email) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            return true;
        }else{
            return false;
        }
    }

    const isMobileNumberValid = (MobileNo) => {
        if(MobileNo.length == 10){
            return true;
        }else {
            return false;
        }
    }
    const setFormValues = (e) => {
        // alert(e.target.name)
        const inputValue = e.target.value;

        setformInputData({ ...formInputData, [e.target.name]: e.target.value })
        if (inputValue.length < 1) {
            
            setErrorData({ ...errorData, [e.target.name]: 1 })
        } else {
            if (e.target.name === "email") {

                if (isEmailValid(inputValue)) {
                    setErrorData({ ...errorData, [e.target.name]: 0 })
                } else {
                    
                    setErrorData({ ...errorData, [e.target.name]: 1 })
                }

            } else if (e.target.name === "phone") {

                if (isMobileNumberValid(e.target.value)) {
                    
                    setErrorData({ ...errorData, [e.target.name]: 0 })
                } else {
                    setErrorData({ ...errorData, [e.target.name]: 1 })
                }

            } else {
                setErrorData({ ...errorData, [e.target.name]: 0 })
                
            }
        }
    }
    console.log(getStateDataList, "getStateDataList")
    console.log(getDistrictList, "getDistrictList")

    const router = useRouter();
    var  pdid  = router.query.pdid;
    let _url = typeof window !== "undefined" && window.location.href.split("/").includes('franchise');
    if(_url){
        pdid  = "franchise";
    }else{
        pdid  = pdid
    }
    return (
        <div className="container staticPages">
            <div className='row'>
                <div className='col-md-3'>
                <div className='leftNav'>
                    <ContentLeftMenu pid={pdid} />
                 </div>
                </div>
                <div className='col-md-9 bgWhite'>
                <div className="row">
                <div className="col-md-8">
                    <h3>Franchise</h3>
                    <div className="row">
                        <div className="col-md-6 ">
                            <div className="form-group">
                                <label>Full Name</label><sup className='input-required'>*</sup>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Full name"
                                    name="name"
                                    value={formInputData?.name}
                                    onChange={e => setFormValues(e)}
                                    data-errorMsg="Field is required"

                                />
                                {errorData?.name === 1 && <div className="error-div">Please enter valid input</div>}

                            </div>
                        </div>
                        <div className="col-md-6 ">
                            <div className="form-group">
                                <label>Email</label><sup className='input-required'>*</sup>
                                <input
                                    className="form-control"
                                    type="mail"
                                    placeholder="Email "
                                    required
                                    value={formInputData?.email}
                                    name="email"
                                    onChange={e => setFormValues(e)}
                                />
                                {errorData?.email === 1 && <div className="error-div">Please enter valid input</div>}

                            </div>

                        </div>
                        <div className="col-md-6 ">
                            <div className="form-group">
                                <label>Mobile</label><sup className='input-required'>*</sup>
                                <input
                                    className="form-control"
                                    type="number"
                                    placeholder="Phone number"
                                    value={formInputData?.phone}
                                    name="phone"
                                    onChange={e => setFormValues(e)}

                                />
                                {errorData?.phone === 1 && <div className="error-div">Please enter valid input</div>}

                            </div>
                        </div>

                        <div className="col-md-6 ">
                            <div className="form-group">
                                <label>Occupation</label><sup className='input-required'>*</sup>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Occupation "
                                    // value={occupation}
                                    value={formInputData?.occupation}
                                    name="occupation"
                                    onChange={e => setFormValues(e)}
                                />
                                {errorData?.occupation === 1 && <div className="error-div">Please enter valid input</div>}

                            </div>
                        </div>

                        <div className="col-md-6 ">
                            <div className="form-group">
                                <label>Proposed Location for Store</label><sup className='input-required'>*</sup>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Location for store "
                                    // value={store}
                                    value={formInputData?.store}
                                    name="store"
                                    onChange={e => setFormValues(e)}
                                />
                                {errorData?.store === 1 && <div className="error-div">Please enter valid input</div>}

                            </div>
                        </div>

                        <div className="col-md-6 ">
                            <div className="form-group">
                                <label>Frontage</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Frontage "
                                    // value={frontage}
                                    value={formInputData?.frontage}
                                    name="frontage"
                                    onChange={e => setFormValues(e)}
                                />
                                {errorData?.frontage === 1 && <div className="error-div">Please enter valid input</div>}

                            </div>
                        </div>

                        <div className="col-md-6 ">
                            <div className="form-group">
                                <label>Area of Store in Sqft</label><sup className='input-required'>*</sup>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Area of store "
                                    // value={area}
                                    value={formInputData?.area}
                                    name="area"
                                    onChange={e => setFormValues(e)}
                                />
                                {errorData?.area === 1 && <div className="error-div">Please enter valid input</div>}

                            </div>
                        </div>

                        <div className="col-md-6 ">
                            <div className="form-group">
                                <label>State</label><sup className='input-required'>*</sup>
                                <select className="select-data form-control" onChange={(e) => setDistrict(e)} value={state} name="state">
                                    <option value="">--Select state--</option>
                                    {getStateDataList.length > 0 && getStateDataList?.map(st => {
                                        return (<option value={st?.stateCode}>{st?.stateName}</option>)
                                    })}
                                </select>
                            </div>
                        </div>



                        <div className="col-md-6 ">
                            <div className="form-group">
                                <label>City</label><sup className='input-required'>*</sup>
                                <select className="select-data form-control" value={city} name="city" onChange={(e) => {
                                    setCity(e.target.value)
                                    setformInputData({ ...formInputData, city: e.target.value })
                                }}>
                                    <option value="">--Select city--</option>
                                    {getDistrictList.length > 0 && getDistrictList?.map(cl => {
                                        return <option value={cl.district_name}>{cl.cityName}</option>
                                    })}
                                </select>
                                {submit === 1 && city === "" && <div className="error-div">{cityError}</div>}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Comments</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Enter your comments "
                                    // value={comment}
                                    value={formInputData?.comment}
                                    // onChange={e=>setComment(e.target.value)}
                                    onChange={e => setformInputData({ ...formInputData, comment: e.target.value })}
                                />
                                {submit === 1 && comment === "" && <div className="error-div">{commentError}</div>}

                            </div>
                        </div>
                   
                    <div  className="col-md-12">
                        
                    <button className="btn btn-primary" onClick={e => handleSubmit(e)} >Submit</button>
                            
                    </div>
                    </div>
                </div>
                <div className="col-md-4">
            <div className="form-img">
                <img src="/static/img/franchasis.jpg"/>
            </div>
            </div>
            </div>
                </div>
            </div>
          
        </div>

    )
}
export default FranchiseForm;
