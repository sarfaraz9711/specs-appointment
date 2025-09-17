import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { corporateGiftingApi } from '../api/account/enquiry';
import { EmailValidator } from './helper/emailValidator';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useRouter } from 'next/router';
import ContentLeftMenu from './ContentLeftMenu';
const phoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
const detail = RegExp(/^[a-zA-Z0-9\s,.'-]+$/);
const prodcutQ= RegExp(/^\d+$/)
const nameReg = RegExp(/^[A-Za-z\s]*$/);
const schema = yup.object().shape({
    name: yup.string().matches(nameReg, "Please enter valid Name").required("Name is required"),
    email: yup.string().email().matches(/^(?!.*@[^,]*,)/).required("Email is required"),
    phone: yup.string().required("Phone is required").matches(phoneRegex, "Please enter valid phone number"),
    compName: yup.string().required("company name is required"),
    city: yup.string().matches(nameReg, "please enter in valid city").required("City Name is required"),
    quantity:yup.string().matches(prodcutQ, "Please enter valid Product Quantity").required("Product Quantity is required"),
    detail: yup.string().required("Details is required").matches(detail, "Please enter valid details"),
}).required();

const MyEquiry = () => {
    let currentColor=useSelector(s=>s.palette.currentColor)
    const { register, handleSubmit, reset, formState: { errors } } = useForm({mode: "onChange",
        resolver: yupResolver(schema)
    });
    const onSubmit =(data)=>{
        console.log(data)
        corporateGiftingApi(data.name, data.email, data.phone, data.compName, data.city, data.quantity, data.detail)
        reset({
            name: '',
            email: '',
            phone:'',
            compName:'',
            city:'',
            quantity:'',
            detail:'',
          })
    } 
    const router = useRouter();
    var  pdid  = router.query.pdid;
    let _url = typeof window !== "undefined" && window.location.href.split("/").includes('corporate-gifting');
    if(_url){
        pdid  = "corporate-gifting";
    }else{
        pdid  = pdid
    }
   

   
    return(
        <div className="container staticPages">
    <div className='row'>
        <div className='col-md-3'>
        <div className='leftNav'>
            <ContentLeftMenu pid={pdid} />
        </div>
        </div>
        <div className='col-md-9 bgWhite'>
        <div className="row">
        <form onSubmit={handleSubmit(onSubmit)} className="col-md-8">
            <h3>Corporate Gifting</h3>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Name</label><sup>*</sup>
                        <input {...register("name", { required: true,/*  pattern: /^[A-Za-z]+$/i */ })}
                            name='name'
                            className="form-control"
                            type="text"
                            placeholder="Name"
                        />
                        { errors.name && <div className="error-div">{errors.name.message}</div>}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Corporate Email</label><sup>*</sup>
                        <input {...register("email")}
                            name='email'
                            className="form-control"
                            type="email"
                            placeholder="Email "
                        />
                        {errors.email && <div className="error-div">{errors.email.message}</div>}

                    </div>

                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Mobile Number</label><sup>*</sup>
                        <input {...register("phone",{required: true})}
                            className="form-control"
                            type="tel"
                            placeholder="Phone Number "
                            maxLength="10" 
                        />
                        {errors.phone && <div className="error-div">{errors.phone.message}</div>}

                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label>Company Name</label><sup>*</sup>
                        <input {...register("compName", {required:true})}
                            className="form-control"
                            type="text"
                            placeholder="Company name "
                        />
                        {errors.compName && <div className="error-div">{errors.compName.message}</div>}

                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label>City</label><sup>*</sup>
                        <input {...register("city", {required:true})}
                            className="form-control"
                            type="text"
                            placeholder="City" 
                        />
                        {errors.city && <div className="error-div">{errors.city.message}</div>}

                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label>Product Quantity</label><sup>*</sup>
                        <input {...register("quantity")}
                            className="form-control"
                            type="text"
                            maxLength="15"
                            placeholder="Product quantity "
                        />
                        {errors.quantity && <div className="error-div">{errors.quantity.message}</div>}

                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label>Additional Details</label><sup>*</sup>
                        <input {...register("detail", {required:true})}
                            className="form-control"
                            type="text"
                            placeholder="Addtional details about your requirments e.g budget, deliveries etc "
                        />
                        {errors.detail && <div className="error-div">{errors.detail.message}</div>}

                    </div>
                </div>
             
            <div className="col-md-12">
                <button className="btn btn-primary" type='submit'>Submit</button>
            </div>
            </div>
        </form>
        <div className="col-md-4">
            <div className="form-img">
                <img src="/static/img/corporateGift.jpg"/>
            </div>
            </div>
    </div>
        </div>
    </div>
   </div>

    )
}
export default MyEquiry;
