export function colorThemeShow(){

    let currentTheme=localStorage.getItem("colorThemeSpurt")
    

    if(currentTheme){
        return currentTheme;
    }
    else{
        return "normal";
    }

}