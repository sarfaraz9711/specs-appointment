export const stickyHeader = () => {
    let number =
        window.pageXOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
    const header = document.getElementById('headerSticky');
    if (header !== null) {
        if (number >= 300) {
            header.classList.add('header--sticky');
        } else {
            header.classList.remove('header--sticky');
        }
    }
};

export const encrptData = (input = "") => {
    //let s = "";
    //let d = "";
    // s = (btoa("hash2 keyword uses for the encryption as string"));
    // s = s.replaceAll("a","aTmopp");
    // d = s+"#s-r"+btoa(d)+"?p-r"+btoa('encryption');
    // d = btoa(d);
    //d = input;
    //return d;



    let s = "";
    let d = "";
    //console.log("input >>>>>>>>>>>>> ", )

    //s = (btoa("hash2 keyword uses for the encryption as string"));
    s = Buffer.from('hash2 keyword uses for the encryption as string',"utf8").toString('base64');
    
    s = s.replace(/a/g,'aTmopp');
    d = input;
     d = s+"#s-r"+Buffer.from(d,"utf8").toString('base64')+"?p-r"+Buffer.from('encryption',"utf8").toString('base64');
     d = Buffer.from(d,"utf8").toString('base64');

    //d = input;

    return d;
   
}

export function decrptData(srr){
	let sArrString = Buffer.from(srr, 'base64').toString('ascii');
    let keyStringRaw = sArrString.split("#s-r")[0];
    let keyStringRawStr = keyStringRaw.replace(/aTmopp/g,"a");
    let keyString = Buffer.from(keyStringRawStr, 'base64').toString('ascii');
    if(keyString === "hash2 keyword uses for the encryption as string"){
		let stringRawArr = sArrString.split("#s-r")[1];
		let stringRaw = stringRawArr.split("?p-r")[0];
		let stringStr = Buffer.from(stringRaw, 'base64').toString('ascii');
		
		return stringStr;
	}
  }	


export function promotionFlagData(value){
    if(value == "buy_x_and_get_x_free" || value == "buy_x_and_get_y_free" ){
        return "Buy one get one free"
    }else if(value == "buy_2x_and_get_x_free" ||value == "buy_2x_and_get_y_free" ){
        return "Buy two get one free"
    }else if(value == "buy_2x_and_get_2x_free" || value == "buy_2x_and_get_2y_free"){
        return "Buy two get two free"
    }else if(value == "buy_x_and_get_x_percent" || value == "buy_x_and_get_y_percent"){
        return "Buy two get discount on cart"
    }else if(value == "buy_2x_and_get_x_percent" || value == "buy_2x_and_get_y_percent"){
        return "Buy three get discount on cart"
    }else if(value == "buy_4x_and_get_x_percent" || value == "buy_4x_and_get_x_amount" || value == "buy_4_any_and_get_x_percent" || value == "buy_4_any_and_get_x_amount" ){
        return "Buy four get discount on cart"
    }else{

    }

}

export const event = ({ action, params }) => {
    const windowCheck = typeof window != "undefined" 
    if(windowCheck){
       // window.gtag('event', action, params)
    }
  }

  export const pushToDataLayer = (data) => {
    const windowCheck = typeof window != "undefined"
    if (windowCheck && windowCheck) {
        console.log(data, 'sssssssssssssWindow')
      window.dataLayer.push(data);
    }
  };  