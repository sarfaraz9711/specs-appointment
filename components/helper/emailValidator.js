const EmailValidator= (value)=>{


    if(/^\w([\.-]?\w)*@\w([\.-]?\w)*(\.\w{2,3})+$/.test(value))
        return true
    else 
        return false;
}

const upperPresent =(value)=>{
    if(/^(?=.*[A-Z]).+$/.test(value)) 
        return true
    else 
        return false;
}

const lowerPresent =(value)=>{
    if(/^(?=.*[a-z]).+$/.test(value))
        return true
    else 
        return false;
}

const numPresent =(value)=>{
    if(/\d/.test(value))
        return true
    else 
        return false;
}

const specialPresent=(value)=>{
    if(/([!@#$%^&*(),.?":{}|<>])/.test(value))
        return true
    else 
        return false;
}
export {EmailValidator,upperPresent,lowerPresent,numPresent,specialPresent}
