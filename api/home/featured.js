import axios from "axios";
import { getCollections } from "../../store/collection/action";
import APIServices from "../../services";
export async function featuredApi(dispatch) {
  //To fetch posts in newsfeed
  // await fetch(apiUrl+'/product-store/featureproduct-list', {
  //     method: 'GET',
  // })
  // .then(json => {
  //     dispatch(getCollections(json.data))
  // })

  const result = await APIServices.getAll("product-store/featureproduct-list");
  sessionStorage.setItem("apiresult", JSON.stringify(result?.data));

  if (result && result.data && result.data.data) {
    dispatch(getCollections(result.data.data));
  }
  // console.log("sangeeeta",result);
}

export async function FurofeaturedApi(dispatch) {
  //To fetch posts in newsfeed
  // await fetch(apiUrl+'/product-store/featureproduct-list', {
  //     method: 'GET',
  // })
  // .then(json => {
  //     dispatch(getCollections(json.data))
  // })

  const result = await APIServices.getAll(
    "product-store/featureproduct-list?FuroFeaturedProductcategory=YES"
  );
  sessionStorage.setItem("apiresult", JSON.stringify(result?.data));

  if (result && result.data && result.data.data) {
    dispatch(getCollections(result.data.data));
  }
  // console.log("sangeeeta",result);
}
export async function getTopSellingProduct(setSellingData) {
  if (
    !localStorage.getItem("topSellingProducts") ||
    localStorage.getItem("checkSessionDate") != new Date().getDate()
  ) {
    const result = await APIServices.getAll(
      "list/custom-product-list?limit=24&offset=0&productDiscountPercent=&priceFrom=0&priceTo=20000&price=&keyword=&topSellingProducts=Yes&count=&categoryslug=&manufacturerId=&sizeValueFilter=&colorsValueFilter=&catIds=&&"
    );
    if (result && result.data && result.data.data) {
      setSellingData(result.data.data);
      localStorage.setItem(
        "topSellingProducts",
        JSON.stringify(result.data.data)
      );
      localStorage.setItem("checkSessionDate", new Date().getDate());
    }
  } else {
    setSellingData(JSON.parse(localStorage.getItem("topSellingProducts")));
  }
}

export async function getTopSellingFuroProduct(setSellingData) {
  const result = await APIServices.getAll(
    "list/custom-product-list?limit=24&offset=0&productDiscountPercent=&priceFrom=0&priceTo=20000&price=&keyword=&topSellingFuroCategoryProduct=Yes&count=&categoryslug=&manufacturerId=&sizeValueFilter=&colorsValueFilter=&catIds=&&"
  );
  if (result && result.data && result.data.data) {
    setSellingData(result.data.data);
    localStorage.setItem(
      "topSellingFuroProducts",
      JSON.stringify(result.data.data)
    );
  }
}
