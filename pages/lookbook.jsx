import HeaderDefault from '../components/shared/headers/HeaderDefault';
import HeaderMobile from '../components/shared/headers/HeaderMobile';
import NavigationList from '../components/shared/navigation/NavigationList';
import FooterFullwidth from '../components/shared/footers/FooterFullwidth';
import Lookbookcomp from '../components/lookbook/';

function Lookbook(){
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Find Locations',
        },
    ];


    return(
    
        <div className="lookbook">
        <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
           <Lookbookcomp />
           <FooterFullwidth />
           </div>
    
    )
}
export default Lookbook;