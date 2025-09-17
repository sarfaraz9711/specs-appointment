import { getProductCategories } from "../../store/product/action";
import APIServices from "../../services";
import { useDispatch } from "react-redux";
export async function categoryListApi(dispatch, flag) {
  // fetch(apiUrl + '/list/category-list', {
  //     method: 'GET',
  // })
  // .then(json => {
  //     dispatch(getProductCategories(json.data));

  // })
  console.log("categoryListApi", flag);

  let result;
  if (!localStorage.getItem("categoryList") || flag == 1) {
    result = await APIServices.getAll("list/category-list");
    localStorage.setItem("categoryList", JSON.stringify(result));
  } else {
    result = JSON.parse(localStorage.getItem("categoryList"));
  }

  if (result && result.data && result.data.data) {
    dispatch(getProductCategories(result.data.data));
  }
}

export async function getProductByCategory(categoryId, offset) {
  // const result = await APIServices.getAll('list/get-product-by-category-new?categoryId='+categoryId+'&offset='+offset+'&limit=6')
  const result = await APIServices.getAll(
    "list/custom-product-list?limit=24&offset=0&productDiscountPercent=&priceFrom=0&priceTo=20000&price=NEW&keyword=&count=&categoryslug=&manufacturerId=&sizeValueFilter=&colorsValueFilter=&catIds=&&"
  );
  if (result) {
    return result.data;
  }
}

export async function getFuroProductNewArrival(categoryId, offset) {
  // const result = await APIServices.getAll('list/get-product-by-category-new?categoryId='+categoryId+'&offset='+offset+'&limit=6')
  const result = await APIServices.getAll(
    "list/custom-product-list?limit=24&offset=0&productDiscountPercent=&priceFrom=0&priceTo=20000&furoCategoryProduct=YES&keyword=&count=&categoryslug=&manufacturerId=&sizeValueFilter=&colorsValueFilter=&catIds=&&"
  );
  if (result) {
    return result.data;
  }
}
export async function getOfferImages(type) {
  const result = await APIServices.getAll(
    "offer/front-page-offer-section?showOn=" + type
  );
  if (result) {
    return result.data;
  }
}
