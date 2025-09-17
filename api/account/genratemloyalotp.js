
import * as axios from 'axios';

export async function mLoyalVal(jsonData) {

//  const  url = 'http://mqst.mloyalpos.com/service.svc/INSERT_CUSTOMER_REGISTRATION_ACTION';


    const result = axios({
        method: 'post',
        url: 'http://mqst.mloyalpos.com/service.svc/INSERT_CUSTOMER_REGISTRATION_ACTION',
        data: jsonData,
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {
        console.log(response, "vchsvc")
    }).catch(error => {
        console.log(error, "fhjvmn")
    })

    console.log(result, "agxahV")


    // const http = axios.create({
       
    //     url: 'http://mqst.mloyalpos.com/service.svc/INSERT_CUSTOMER_REGISTRATION_ACTION',
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //   });
    // const data = (jsonData)
   
    
    // const result =await http.post(url,data);
    // if(result&&result.data&&result.data.status === 1){
        
    //     localStorage.setItem("spurtToken", result.data.data);
    //                     localStorage.setItem("spurtUser",JSON.stringify(result.data.data));
    //                     modalSuccess('success',result.data.message)
                        
    

    // }else{
    //     console.log("error")
    // }

};