const PhoneValidator= (value)=>{


    if(/^\d{10}$/.test(value))
        return true
    else 
        return false;
}

export {PhoneValidator};