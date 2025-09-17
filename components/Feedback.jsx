import React  from 'react';
import { useEffect ,useState } from 'react';
import { useSelector } from 'react-redux';
import { feedApi } from '../api/account/feedback';
import { EmailValidator } from './helper/emailValidator';
import Router, { useRouter } from 'next/router';
/* import PopUpMesage from './popUp'; */
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import ContentLeftMenu from './ContentLeftMenu';
const schema = yup.object().shape({
    email: yup.string().email().matches(/^(?!.*@[^,]*,)/).required("Email is required"),
    //category : yup.string().required("please select"),
    service: yup.string().required(),
    feedback: yup.string().nullable().optional().min(1, "Message must be more than 1 characters long").max(255, "Address must be less than 255 characters long"),
    //compName: yup.string().required("company name is required"),
}).required();
const MyFeedback = () => {
    const [user, setUser] = useState(null);
    let currentColor = useSelector(s => s.palette.currentColor)
    const { register,trigger, handleSubmit,reset, formState: { errors } } = useForm({  mode: "onChange",
        resolver: yupResolver(schema)
    });
    const onSubmit =(data)=>{
        console.log(data)
        feedApi(data.email, data.feedback, data.service, resetForm)
       // corporateGiftingApi(data.name, data.email, data.phone, data.compName, data.city, data.quantity, data.detail)
    } 
    const resetForm=()=>{
        reset(user);
    }
    const doSomething = async (value) => {
        await trigger(['category'])
      };
      const router = useRouter();
      var  pdid  = router.query.pdid;
      let _url = typeof window !== "undefined" && window.location.href.split("/").includes('feedback');
      if(_url){
          pdid  = "feedback";
      }else{
          pdid  = pdid
      }
    return (
        <>
        
            <div className="container staticPages">
                <div className='row'>
                    <div className='col-md-3'>
                    <div className='leftNav'>
                           <ContentLeftMenu pid={pdid} />
                        </div>
                    </div>
                    <div className='col-md-9 bgWhite'>
                    <div className='row'>
                    <div className='col-md-8'>

                 
                <form onSubmit={handleSubmit(onSubmit)} className="ps-form--contact-us">
                    <h3>Feedback</h3>
                    <div className="row">
                        <div className="col-md-6 col-sm-12 ">
                            <div className="form-group">
                                <label>Email</label><sup>*</sup>
                                <input {...register("email")}
                                    className="form-control"
                                    type="mail"
                                    placeholder="Email "
                                />
                                {errors.email && <div className="error-div">{errors.email.message}</div>}
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12 ">
                            <div className="form-group">
                                <label>Service</label><sup>*</sup>
                                <select {...register("service")} className="form-control"
                                onChange={(e) => doSomething(e.target.value)}
                                >
                                    <option value="" >Please Select</option>
                                    <option value="complain">Complaint</option>
                                    <option value="feedback">Feedback</option>
                                 </select>
                                 {errors.service && <div className="error-div">{errors.service.message}</div>}
                            </div>
                        </div>
                        <div className="col-md-12 col-sm-12">
                            <div className="form-group">
                                <label>Message</label><sup>*</sup>
                                <textarea {...register("feedback", {required:true})}
                                    className="form-control"
                                    type="text"
                                    maxLength="500"
                                    placeholder="Enter your Feedback Here "
                                    //value={feedback}
                                   // onChange={(e) => {setFeedback(e.target.value); e.target.value !== "" && setFeedbackError("")}}
                                />
                                {errors.feedback && <div className="error-div">{errors.feedback.message}</div>}

                            </div>
                        </div>
                        <div>
                            
                        </div>
                    </div>
                    

                    <div className="form-group submit">
                        <button className={`ps-btn ${currentColor}`} type='submit' >Submit</button>
                        {/* <button style={{ marginLeft: "20px" }} className={`ps-btn ${currentColor}`} onClick={() => reset()} >Reset</button> */}
                    </div>
                </form>
                </div>
                    <div className='col-md-4'>
                        <img src="/static/img/feedback.jpeg" className='feedback-img' />
                    </div>
                </div>
                    </div>
                </div>
        
               
            </div>
        
        </>
    )
}
export default MyFeedback;
