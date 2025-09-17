
import ThemeChanger from "../../components/elements/color/themeControl"
import QuestionProduct from "../../components/partials/product/ProductQuestion"
import ViewAllQuestion from "../../components/partials/product/ViewAllQuestion"
import FooterFullwidth from "../../components/shared/footers/FooterFullwidth"
import HeaderMobileProduct from "../../components/shared/header-mobile/HeaderMobileProduct"
import HeaderDefault from "../../components/shared/headers/HeaderDefault"
import NavigationList from "../../components/shared/navigation/NavigationList"

const ProductQuestion =()=>{
    return(
        <div>
            <HeaderDefault />
            <HeaderMobileProduct />
            <NavigationList />
            <ThemeChanger />

            <ViewAllQuestion />
            
            <FooterFullwidth />


            
        </div>
    )
}

export default ProductQuestion