import APIServices from '../../services'
import {apiUrl} from '../../api/url'
export async function pageDetApi(id,setDet,setPostLoading) {

        // await fetch(apiUrl+'/pages/get_pagedetails/'+id, {
        //     method: 'GET',
        // })
          
        // .then(json => {
        //     setDet(json.data)
        //     setPostLoading(false)               
        // })

        const result = await APIServices.get('pages/get_pagedetails/'+id)

        if(result && result.data && result.data.data){
            setDet(result.data.data)
             setPostLoading(false)  
        }

    }


    export async function annualReportApi(setDet,setPostLoading) {
        const result = await APIServices.get('page/annual-report');
        if(result && result.data && result.data.data){
            console.log("result.data.data",result.data.data);
           return result.data.data;
        }else{
            return [];
        }
    }



    export async function fileDownload(fileBase) {
        console.log("fileBase",fileBase);
        window.open(`${apiUrl}/page/download/${fileBase}`);
    }