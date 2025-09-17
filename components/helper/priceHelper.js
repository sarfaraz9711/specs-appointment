export const priceHelpFunc=(price, taxType, taxValue,availValue)=>{
    
    if(availValue!==""){

        switch(taxType){
            case 1:
                const priceWithOutTax = parseFloat(price) + parseFloat(taxValue)+parseFloat(availValue);
              
                return Math.round(priceWithOutTax);
               
            case 2:
               
                const percentToAmount = price * (taxValue / 100);
                const priceWithTax = parseFloat(price) + parseFloat(percentToAmount)+parseFloat(availValue);
                
                return Math.round(priceWithTax);
                
            default:
                return parseFloat(price)+parseFloat(availValue);
               
        }

    }
    else{
       
        switch(taxType){
            case 1:
                
                const priceWithOutTax = parseFloat(price) + taxValue;
                
                return Math.round(priceWithOutTax)
                
              
               
            case 2:
              
                const percentToAmount = price * (taxValue / 100);
                const priceWithTax = parseFloat(price) + percentToAmount;
               
                return Math.round(priceWithTax);
            default:
                return price;
        }

    }
    
} 