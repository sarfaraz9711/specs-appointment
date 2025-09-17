import APIServices from "../../services";
import { modalSuccess, modalWarning } from "../intercept";
import * as ga from '../../utilities/common-helpers'

export async function UserLogin(
  email,
  password,
  loginType,
  Router,
  setLoginError,
  dispatch,
  setMail,
  setPassword,
  setLoadImg,
  customCaptcha,
  browserIdentifier
) {
  console.log(333);
  // return fetch(apiUrl+'customer/login', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //         'emailId':email, 'password': password,"type":loginType
  //     })
  // })
  //     .then((response) => {
  //             if (response.status === 1) {

  //                 localStorage.setItem("spurtToken", response.data.token);
  //                 // localStorage.setItem("spurtUser",JSON.stringify(response.data.user));
  //                 getProfileApi( )
  //                 modalSuccess('success',response.message)
  //                 Router.push('/');
  //                 cartListApi(dispatch)

  //             } else {
  //                 setLoginError(response.message)
  //                 modalWarning('error',response.message)
  //                 setMail("")
  //                 setPassword("")

  //             }
  //     })

  const data = JSON.stringify({
    emailId: email,
    password: password,
    type: loginType,
    captchaToken: customCaptcha,
    browserIdentifier,
  });
  const result = await APIServices.create("customer/login", data);
  if (result && result.data && result.data.status === 210) {
    //modalSuccess('success', "OTP has sent on your mobile, Please validate.")
    return result?.data;
  } else if (result && result.data && result.data.status === 1) {
    let data = {
      event: "login",
      method: "Google"
    }
    ga.pushToDataLayer(data);
    localStorage.setItem("spurtToken", result?.data?.data?.token);
    // localStorage.setItem("spurtUser",JSON.stringify(response.data.user));
    // modalSuccess('success', result?.data?.message)
    Router.push("/");
  } else if (result && result.data.status == 205) {
    return result.data;
  } else {
    setLoginError(result.data.message);
    modalWarning("error", result.data.message);
    setMail("");
    setPassword("");
  }
  setLoadImg(false);
}
