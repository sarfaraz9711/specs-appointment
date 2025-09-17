import React, { useEffect, useRef, useState } from "react";
import APIServices from '../../../services'
import { ReloadOutlined } from "@ant-design/icons";
const CustomCaptcha = ({ setEnteredCaptcha, enteredCaptcha, setBrowserIdentifier, isCaptchaBlank, reloadCaptchaOnError }) => {
    console.log('In captcha')
    const [refreshCaptcha, setRefreshCaptcha] = useState(false);
    const canvasRef = useRef(null);


    const callCustomCaptchaApi = async () => {
        const result = await APIServices.create(`captcha/generate-custom-captcha`);
        console.log(result, "Nero hello ssssssss")
        if (result.data.status == 1) {
            setBrowserIdentifier(result.data.data.browserIdentifier)
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            initializeCaptcha(ctx, result.data.data);
        }
    }

    useEffect(() => {
        callCustomCaptchaApi();
    }, [refreshCaptcha, reloadCaptchaOnError]);



    const drawCaptchaOnCanvas = (ctx, captchaData) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const textColors = ['rgb(0,0,0)', 'rgb(130,130,130)'];
        const xInitialSpace = 25;
        ctx.font = '20px Roboto Mono';
        ctx.fillText(
            captchaData.code,
            9,

            Math.floor(Math.random() * 16 + 25),
            100
        );

    };

    const initializeCaptcha = (ctx, captchaData) => {
        // setReloadCaptcha(!refreshCaptcha)

        drawCaptchaOnCanvas(ctx, captchaData);
    };

    const handleUserInputChange = (e) => {
        setEnteredCaptcha(e.target.value);
    };

    const refreshCaptchaHandle = () => {
        setRefreshCaptcha(!refreshCaptcha)
        setEnteredCaptcha('');
    }


    return (

        <div className="custom-captcha-container" style={{ display: 'flex', flexDirection: 'column', padding: '20px', border: 'solid thin #c8ddff' }} >
            <h1>Captcha</h1>
            <div style={{ display: 'flex' }} >
            <div>
                <canvas ref={canvasRef}
                    width="100"
                    height="50">

                </canvas>
                
            </div>
            <div  className="ps-login-email-contain" style={{display:'flex', marginBottom: '0', columnGap: '6px'}}>
            <ReloadOutlined style={{fontSize: '24px', color: '#008fd3',marginTop:"10px"}} onClick={e => refreshCaptchaHandle()} />
                <input

                    type="text"
                    id="user-input"
                    placeholder="Enter captcha"
                    value={enteredCaptcha}
                    onChange={handleUserInputChange} />
            </div>
            </div>
            {isCaptchaBlank && <span style={{color: 'red'}}>Enter Captcha</span>}
        </div>
    );
}
export default CustomCaptcha;