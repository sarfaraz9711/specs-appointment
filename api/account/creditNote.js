import APIServices from "../../services";
import { modalSuccess } from "../intercept";

export async function creditNoteByEmail(
  setCoupanData,
  setActCoupanData,
  setLoaderActive
) {
  if (localStorage.getItem("spurtUser")) {
    const data = {
      email: JSON.parse(localStorage.getItem("spurtUser")).email,
    };
    const result = await APIServices.create(
      `promotions/coupon-based/get-coupon-by-email`,
      data
    );
    setLoaderActive(false);
    if (result && result.data && result.data.status == 200) {
      const addResult = result.data.data.map((item) => {
        const couponClass = "";
        const endDate = new Date(item.endDate);
        const todayDate = new Date();
        if (todayDate.getTime() > endDate.getTime() || item.active==0) {
          couponClass = "expired";
        } else if (item.customerEmail == null) {
          couponClass = "pending";
        } else {
          couponClass = "redeem";
        }
        return Object.assign(item, {couponClass});
      });
      console.log("addResultaddResult", addResult)
      setCoupanData(addResult);
      setActCoupanData(addResult);
    }
  }
}

export async function getUserCreditNote() {
  const creditResult = await APIServices.get(`credit-note/user/creditnotes`);
  if (creditResult.data.status == 1) {
    const addResult = creditResult.data.data.map((item) => {
      const couponClass = "";
       if (item.actStatus == 'Active') {
        couponClass = "pending";
      } else if (item.actStatus == 'Redeem') {
        couponClass = "redeem";
      }else{
          couponClass = "expired";
      }
      return Object.assign(item, { couponClass: couponClass });
    });

    return addResult
  }else{
    return false
  }
}
