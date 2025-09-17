import React from 'react';

import NetworkFallback from '../../components/elements/NetDisconnect';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import ThemeChanger from '../../components/elements/color/themeControl';
import FooterDefault from '../../components/shared/footers/FooterDefault';

function NetworkIndex(){
    return(
        <div className="custom-network-container">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <ThemeChanger />
            <NetworkFallback />
            {/* <FooterDefault /> */}
        </div>
    )
}

export default NetworkIndex