import React from 'react';
//import {ConnectPlugin} from '../../../connectPlugins';

function OptionNameDisplay({optionName}){
    


    // useEffect(()=>{
        let totalOptionResponse=optionName.options 
        let optionArray=optionName.optionValueArray
        let myArrayOption=[]

        
        totalOptionResponse&&totalOptionResponse.forEach((a)=>{
           
            a.optionValue.forEach((b)=>{
                
                for( var i =a.optionValue.length - 1; i>=0; i--){
                    
                    for( var j=0; j<optionArray.length; j++){
                      if(b.optionValueName === optionArray[j]){
                        const found = myArrayOption.some(el => el.optionArrayName === a.optionname);
                        if (!found){
                            myArrayOption.push({optionArrayName:a.optionname,optionName:b.optionValueName})
                        } 
                       }
                     }
                   }
            })

        })



    return(
       <p>
          
           {myArrayOption&&myArrayOption.map((name,index)=>{
           return(<strong key={index}>{name.optionArrayName}:{name.optionName}{' '}</strong>)
           },[])}
         
       </p>
    )
    

}

export default OptionNameDisplay