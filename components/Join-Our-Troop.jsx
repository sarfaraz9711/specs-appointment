import React from 'react';
import { useSelector } from 'react-redux';
import { careerApi } from '../api/account/joinourtrrop';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
const phoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
const addressRegex = RegExp(/^[a-zA-Z0-9\s,.'-]+$/);
const nameReg = RegExp(/^[A-Za-z\s]*$/);
const schema = yup.object().shape({
    name: yup.string().matches(nameReg, "Please enter valid Name").required("Name is required"),
    email: yup.string().email().matches(/^(?!.*@[^,]*,)/).required("Email is required"),
    phone: yup.string().required("Phone is required").matches(phoneRegex, "Please enter valid phone number"),
    address: yup.string().required("Address is required").matches(addressRegex, "Please enter valid Address"),
    functionalarea: yup.string().matches(nameReg, "please enter in string").required("Name is required"),
    link1: yup.string().url().required("Link1 is required"),
    link2: yup.string().url().required("Link2 is required")
}).required();
const Form = () => {
    let currentColor = useSelector(s => s.palette.currentColor)
    const { register, handleSubmit, formState: { errors } } = useForm({mode: "onChange",
        resolver: yupResolver(schema)
    });
    const onSubmit =(data)=>{
        careerApi(data.name,data.email,data.phone,data.address,data.functionalarea,data.link1,data.link2)
    } 
    return (
        <div className="ps-contact-form">
            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)} className="ps-form--contact-us" >
                    <h3>Join Our Troop</h3>
                    <div className="row">
                        <div className="col-xl-6 col-lg-4 col-md-6 col-sm-12 col-12 ">
                            <div className="form-group">
                                <label>Name* </label>
                                <input {...register("name", { required: true,/*  pattern: /^[A-Za-z]+$/i */ })}
                                    className="form-control"
                                    type="text"
                                    placeholder="Name"  
                                />
                                { errors.name && <div className="error-div">{errors.name.message}</div>}
                                </div>
                        </div>
                        <div className="col-xl-6 col-lg-4 col-md-6 col-sm-12 col-12 ">
                            <div className="form-group">
                                <label>Email Address * </label>
                                <input {...register("email")}
                                    className="form-control"
                                    type="mail"
                                    placeholder="Email "
                                />
                                {errors.email && <div className="error-div">{errors.email.message}</div>}

                            </div>

                        </div>
                        <div className="col-xl-6 col-lg-4 col-md-6 col-sm-12 col-12 ">
                            <div className="form-group">
                                <label>Contact Details * </label>
                                <input {...register("phone",{required: true})}
                                    className="form-control" 
                                    type="tel"
                                    placeholder="Phone Number "
                                    maxLength="10" 
                                />
                                {errors.phone && <div className="error-div">{errors.phone.message}</div>}
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-4 col-md-6 col-sm-12 col-12 ">
                            <div className="form-group">
                                <label>Address * </label>
                                <input {...register("address",{required: true})}
                                    className="form-control"
                                   // name='addresss'
                                    type="text"
                                    placeholder="Address "
                                />
                                {errors.address && <span className="error-div">{errors.address.message}</span>}
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-4 col-md-6 col-sm-12 col-12 ">
                            <div className="form-group">
                                <label>Functional Area / Field of Interest * </label>
                                <input {...register("functionalarea")}
                                    className="form-control"
                                    type="text"
                                    //name='area'
                                    placeholder="Functional Area/Field of Interest "  
                                />
                                {errors.functionalarea && <div className="error-div">{errors.functionalarea.message}</div>}

                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-4 col-md-6 col-sm-12 col-12 ">
                            <div className="form-group">
                                <label>External Link 1 *</label>
                                <input {...register("link1")}
                                    //name='externallink1'
                                    className="form-control"
                                    type="text"
                                    placeholder="External Link 1 "
                                />
                                {errors.link1 && <div className="error-div">{errors.link1.message}</div>}

                            </div>
                        </div>

                        <div className="col-xl-12 col-lg-4 col-md-6 col-sm-12 col-12 ">
                            <div className="form-group">
                                <label>External Link 2 * </label>
                                <input {...register("link2")}
                                   // name='externallink2'
                                    className="form-control"
                                    type="text"
                                    placeholder="External Link 2 "
                                />
                                {errors.link2 && <div className="error-div">{errors.link2.message}</div>}

                            </div>
                        </div>

                    </div>
                    <div className="form-group submit">
                        <button  className={`ps-btn ${currentColor}`} type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>

    )
}
export default Form;
