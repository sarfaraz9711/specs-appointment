export const fallBackLanguage="en";

export const languages=["en","nl"];

export const validateLanguage=lang=>{
    return language.includes(lang)?lang:fallBackLanguage;
}

export const getLanguage=lang=>{
    let language=lang.match(/[a-zA-z\-]{2,10}/g)[0];
    language=language.split("-")[0];
    return validateLanguage(language);
}


export const configureLanguage= ctx =>{

    const {req} = ctx;

    const language=req 
    ?req.headers["accept-language"]:window.navigator.language;

    return language;

};