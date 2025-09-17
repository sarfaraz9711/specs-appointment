//import { modalSuccess,modalError } from "../../intercept";
import APIServices from '../../services'

//import  Router  from "next/router";

export async function  hitVisitor(object = {}){
    let userId = null;
    if (localStorage.getItem("spurtUser")) {
        let jsonD = JSON.parse(localStorage.getItem("spurtUser"));
        userId = jsonD.id;
    }
    object.userId = userId;

    const result =await APIServices.create('banner/secure/visitor',object);
    console.log("post result",result);
}

export async function  getVisitor(){
    const result =await APIServices.create('banner/secure/get-visitor',{});
    if(typeof result != 'undefined'){
        console.log("get result",result);
        return result.data;
    }else{
        return {};
    }
    
}