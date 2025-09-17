import APIServices from '../../services'
export async function fileUpload(fileUploadData, setLoaderActive) {

    const result = await APIServices.create('media/upload-file',fileUploadData) 
    console.log(result.data)  
    setLoaderActive(false)
    return result.data
} 