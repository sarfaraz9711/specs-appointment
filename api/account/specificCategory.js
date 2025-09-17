import APIServices from '../../services'

export async function specificCategoryApi(categorySlug,setSpecificCat,setSelectedCategoryId) {

    // fetch(apiUrl + '/list/specific-category-list?categorySlug='+categorySlug, {
    //     method: 'GET',
    // })
    // .then(json => {
    //     setSpecificCat(json.data)
    //     // setSelectedCategoryId([JSON.stringify(json.data.categoryId)])
    // })
    
    const result= await APIServices.getAll('list/specific-category-list?categorySlug='+categorySlug)
    if(result&&result.data&&result.data.data){
        let categoryMain = result.data.data;
       
        if(categoryMain && !window.location.toLocaleString().includes("categoryId")){

            categoryMain && categoryMain.children && categoryMain.children.map((item)=>{
                if(item.children){
                    item.children.forEach(element => {
                        categoryMain.children.push(element)       
                    });                  
                }
            })
            const modifiedSubCats =  categoryMain && categoryMain.children && categoryMain.children.map((item)=>{
                    if(item.categorySlug == categorySlug){
                        item.subCategorySelected = true;
                    }           
                    return item;
                })
                categoryMain.children = modifiedSubCats;


         }else if(window.location.toLocaleString().includes("categoryId")){
            
            const urlParams = new URLSearchParams(window.location.search);
            const catId = urlParams.get('categoryId');
            categoryMain.children.map((item)=>{
                if(item.children){
                    item.children.forEach(element => {
                        categoryMain.children.push(element)       
                    });   
                }
            })
            const modifiedSubCats =  categoryMain && categoryMain.children && categoryMain.children.map((item)=>{
                if(catId.includes(item.categoryId)){
                    item.subCategorySelected = true;
                }
                return item;
            })
            categoryMain.children = modifiedSubCats;
         }
         
        setSpecificCat(categoryMain)   

    }
}