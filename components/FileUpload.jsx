import React from "react";
import { useState } from "react";
import {fileUpload} from "../api/account/fileUpload"
import { modalSuccess, modalWarning } from "../api/intercept";
import { message } from "antd";
import Loader from "./shared/Loader";

export const FileUploadComponent =   ({setFilePath, fileType, s3Folder=""}) => {
const [fileFormatMsg, setFileFormatMsg]=useState(false)
const [isLoaderActive, setLoaderActive]=useState(false)

    const fileSelect =  (event) => {
        setLoaderActive(true)
        const fileData = event.target.files[0]
        const uploadFileType = event.target.files[0].type
        let setFileType=""
        if(uploadFileType=="image/png"){
            setFileType="PNG"
        }else if(uploadFileType=="image/jpg" || uploadFileType=="image/jpeg"){
            setFileType="JPG"
        }else if(uploadFileType=="application/pdf"){
            setFileType="PDF"
        }else{
            setFileType="Format Not valid"
        }

        if(fileType.includes(setFileType)){
            console.log("valid format")
            setFileFormatMsg(false)
            event.target.value = '';

          }else{
            console.log("Invalid format")
            event.target.value = '';
            setFileFormatMsg(true)
            return false
          }
          
        let fd = {}
        let reader = new FileReader();
        let fileBase64
    reader.onloadend = function() {
        fileBase64 = reader.result
    }
     reader.readAsDataURL(fileData);
     setTimeout(async ()=>{
        fd={"fileName":'imageupload.jpg',
        "path":s3Folder?s3Folder:"",
        "image":fileBase64
     }
        const result = await fileUpload(fd, setLoaderActive)
        //setFilePath.push(result.data.image)
        if (result.status == 1){
            setFilePath(oldArray => [...oldArray, result.data.image])
        }else{
            modalWarning('error',result.message)

        }
     },100)
    }
    return (
        <>
       <input id="fileupload" type="file" className="form-control" onChange={(e) => fileSelect(e)} />
       {fileFormatMsg && <p className="alert alert-danger">File Format not valid, Please upload JPG, PNG and PDF format file</p>}
       {isLoaderActive &&<Loader />}
       </>      
    )
}