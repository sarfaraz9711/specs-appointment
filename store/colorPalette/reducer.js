import { actionTypes } from './action';

export const palette = {
    showContent: "color-show",
    currentColor: "blue",
    viewcurrentColor:"bluecolor",
    viewpannel:"block"
}

function reducer(state = palette, action) {
    switch (action.type) {
        case actionTypes.COLOR_SHOW:
            return {
                ...state,
                ...{ showContent: action.payload },
            };
        case actionTypes.COLOR_THEME:
            return {
                ...state,
                ...{ currentColor: action.payload },
            };
        case actionTypes.COLOR_VIEW:
            return {
                ...state,
                ...{ viewcurrentColor: action.payload },
            };

        case actionTypes.DISPLAY_PANEL:
            return {
                ...state,
                ...{ viewpannel: action.payload}
            }
        default:
            return state;
    }
}
export default reducer;
