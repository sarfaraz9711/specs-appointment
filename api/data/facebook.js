import axios from 'axios'
const qs = require('qs');

export async function facebookGtm(data, eventType) {

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      };
console.log("data11111111111111111",data)
const dataLength = data.length
let actualData=[]
for(let i=0; i<dataLength; i++){
    actualData.push({
        "event_name": eventType,
        "event_time": Math.floor(Date.now() / 1000),
        "action_source": "website",
        "user_data": {
            "em": [
                null
            ],
            "ph": [
                null
            ]
        },
        "custom_data": data[i]
    })
}
  const payload={"data": actualData}
  const flattenedData = qs.stringify(payload);
    const url = `https://graph.facebook.com/v20.0/${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}/events?access_token=${process.env.NEXT_PUBLIC_FACEBOOK_TOEKN}`
    const result = await axios.post(url,flattenedData,{
        headers: headers
    }).then(res=>{
        console.log("facebook ressssssssss",res)
    }).catch(err=>{
        console.log("facebook errrrrrrrrr",err)
    })
    
}

