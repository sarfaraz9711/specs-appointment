import React, { useState, useEffect } from 'react';

const Loader = (message) => {

    console.log("loader<<<<<<<<<<*******", message);
    return (


        <div className='loader-page'>
            <i className="fa fa-spinner fa-spin"></i>
            {message // 👈 null and undefined check
                && Object.keys(message).length === 0
                && Object.getPrototypeOf(message) === Object.prototype ? <p>Please wait we are processing...</p>: <p>{message.message} </p> }
        </div>


    );
}

export default Loader;
