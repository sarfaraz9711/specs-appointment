import HeaderDefault from "../components/shared/headers/HeaderDefault"
import FooterFullwidth from "../components/shared/footers/FooterFullwidth"



function qrResult(){
    return (
        <>
        
        <div className="row align-items-center height100 qr-page">
            <div className="col-md-6 text-center">
                <a href="https://redchief.in">
                    <img src="/static/img/red-chief-logo.png"/>
                    <div>redchief.in</div>
                </a>
            </div>
            <div className="col-md-6 text-center">
            <a href="https://redchief.in/rc-sports">
            <img src="/static/img/rc-sports-logo.png"/>
            <div>furosports.com</div>
            </a>
            </div>
        </div>
        
        </>
    )
}

export default qrResult