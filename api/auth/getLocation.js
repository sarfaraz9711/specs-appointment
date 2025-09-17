import APIServices from '../../services';
import { areaList } from '../../store/setting/action';

export async function getLocationListApi( body, dispatch) {

  const data = JSON.stringify(body)
  // console.log(body, "dhwbdh")
  const result = await APIServices.create('state/get-store-location', data)
 
  
      dispatch(areaList(result.data.data))

    
}