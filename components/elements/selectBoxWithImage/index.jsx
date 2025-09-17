import { useState } from 'react';
const SelectBoxWithImage = ({ banks, setChannel }) => {
    // console.log(banks, "nero banksKs")
    const [selectedBank, setSelectBank] = useState("--Select Bank--");
    const [bankImage, setSelectedBankImage] = useState("");


    const changeBank = (item) => {


        // let itemObj = JSON.parse(e.target.dataset.item);
        const channelCode = item.channelCode;
        const channelDisplayName = item.channelDisplayName;
        const iconUrl = item.iconUrl;
        console.log(channelDisplayName, "console");
        console.log( iconUrl, "Nerosss");
        setChannel(channelCode)
        setSelectBank(channelDisplayName);
        setSelectedBankImage(iconUrl);
        let element = document.getElementById("bank-select-option")
        element.style.display = "none";
    }

    const openSelectBox = (e) => {
        let element = document.getElementById("bank-select-option")
        element.style.display = "block"
    }

    return (
        <div class="bank-select">
            <div class="bank-option bank-option-selected" onClick={openSelectBox}><img
                src={bankImage} />
                <span>  {selectedBank}</span>
            </div>
            <div class="bank-select-option" id="bank-select-option">
                {banks && banks.map((item) => {
                    //data-item={JSON.stringify(item)}
                    return <div class="bank-option" onClick={() => changeBank(item)}  ><img
                        src={item.iconUrl} />
                        <span>{item.channelDisplayName}</span>
                    </div>
                })

                }


            </div>
        </div>
    )
}

export default SelectBoxWithImage;