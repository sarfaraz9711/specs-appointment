// import  Router  from "next/router";
// import { modalSuccess, modalWarning } from "../intercept";
// import APIServices from '../../services'

// export async function contactApi(name,mail,phone,message) {

//     // fetch(apiUrl+'/list/contact-us', {
//     //         method: 'POST',
//     //         body: JSON.stringify({
//     //                 "name": name,
//     //                 "email":mail,
//     //                 "phoneNumber":phone,
//     //                 "message":message
//     //         })
//     // })
//     // .then(json=>{
//     //     if(json.status===1){
//     //         Router.push('/')
//     //         modalSuccess('success',json.message)
//     //     }
//     //     else{
//     //         modalWarning('error',json.message);
//     //     }
//     // })

//     const data = JSON.stringify({
//                     name: name,
//                     email:mail,
//                     phoneNumber:phone,
//                     message:message
// })
// const result =await APIServices.create('list/contact-us',data)
// if(result&&result.data&&result.data.status===1){
//             Router.push('/')
//             modalSuccess('success',result.data.message)
//         }
//         else{
//             modalWarning('error',result.data.message);
//         }

// }

export const contactApi = async (name, email, phoneNumber, message) => {
  try {
    const res = await fetch("http://192.168.100.59:4200/api/list/contact-us", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer U2FsdGVkX18NJn3kgDxQNO3BbuXeeL8OKSWKlVZwWNoHBLeyQFoUZ3/rgEFpzVKEejppQJRoF0Z227UrqqRDjWZMk9VEF5LwviEqc1hoHuEfFXy+RtsSMzPgFgiTVbu+Pre6gHtovHYQzmRchnzRQWE8DQhqBUPki8225SeqouVqaBGwEAkgeresnnpt9Hrx1PwLZlkUTVUXp513y2G09w==",
      },
      body: JSON.stringify({
        name,
        email,
        phoneNumber,
        message,
      }),
    });

    const data = await res.json();
    console.log("API RESPONSE:", data);

    return data;
  } catch (error) {
    console.error("API ERROR:", error);
    return null;
  }
};
