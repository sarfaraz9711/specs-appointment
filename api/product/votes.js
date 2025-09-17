import {modalSuccess} from "../intercept"
import { apiUrl } from "../url";
import APIServices from '../../services'
async function alterVote(answerId,like){
//     fetch(apiUrl+'/store-question-answer/update-like-status',{
//         method: 'POST',
//         headers: {
//             "Accept": 'application/json',
//             "Content-type": 'application/json',
//         },
//         body: JSON.stringify({
//             "type": like,//1- voted; 2- rmVote,
//             "answerId":answerId
//         })
//     })
//     .then(json => {
//         if (json) {
//             if (json.status===1) {
//                 modalSuccess("success",json.message)
//             }
//         }
//     })             
// }

const data = JSON.stringify({
    "type": like,//1- voted; 2- rmVote,
 "answerId":answerId
});
const result = await APIServices.create(
"store-question-answer/update-like-status",
data
)
if(result && result.data && result.data.status ==1){
modalSuccess("success",result.data.message)

}

}

export {alterVote}

