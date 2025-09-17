import { createStore,applyMiddleware} from 'redux';
import {composeWithDevTools} from "redux-devtools-extension"
import rootReducer from './rootReducer';
import thunk from 'redux-thunk'
import { createWrapper } from 'next-redux-wrapper';


    const initialState = {};
    const middleware=[thunk];


const configureStore=createStore(rootReducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));


export default configureStore;

const makestore=()=>configureStore;
export const wrappers=createWrapper(makestore);


