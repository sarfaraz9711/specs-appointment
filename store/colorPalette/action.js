export const actionTypes = {
   COLOR_SHOW:'COLOR_SHOW',
   COLOR_THEME:'COLOR_THEME',
   COLOR_VIEW:'COLOR_VIEW',
   DISPLAY_PANEL:"DISPLAY_PANEL"
};

export function colorShowContent(payload){
    return { type: actionTypes.COLOR_SHOW,payload:payload };

}

export function colorThemeCurrent(payload){
    return { type: actionTypes.COLOR_THEME,payload:payload };

}
export function viewcolorThemeCurrent(payload){
    return { type: actionTypes.COLOR_VIEW,payload:payload };

}

export function displayWhenclose(payload){
    return { type: actionTypes.DISPLAY_PANEL,payload:payload };

}

