export function productOptionHelper(payload){

    const  product  = payload;
    const localCart = JSON.parse(localStorage.getItem('cartItem'))

    let currentCart = localCart;
    let existItem = currentCart.find(
        (item) => item.productId === product.productId
    );

    if (existItem) {
        
     
    } else {
        
    }

}