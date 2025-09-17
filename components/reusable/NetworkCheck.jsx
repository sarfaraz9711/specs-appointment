import { useState, useEffect } from "react";
import  Router  from "next/router";

function useNetwork(){
    const [isOnline, setNetwork] = useState(process.browser&& window.navigator.onLine);
    const updateNetwork = () => {
       setNetwork(window.navigator.onLine);

    };

   

    useEffect(() => {
       window.addEventListener("offline", updateNetwork);
       window.addEventListener("online", updateNetwork);
       return () => {
          window.removeEventListener("offline", updateNetwork);
          window.removeEventListener("online", updateNetwork);
       };
    });
    return isOnline;
 };

 export default useNetwork

//  import React, { useState, useEffect, useCallback } from 'react';

// const App = () => {
//   const [online, setOnline] = useState(true);

//   const onlineListener = useCallback(() => setOnline(true), [setOnline]);
//   const offlineListener = useCallback(() => setOnline(false), [setOnline]);

//   useEffect(() => {
//     window.addEventListener('online', onlineListener);
//     window.addEventListener('offline', offlineListener);

//     return () => {
//       window.removeEventListener('online', onlineListener);
//       window.removeEventListener('offline', offlineListener);
//     };
//   }, [onlineListener, offlineListener]);

//   return (
//     <div className="App">
//       <img
//         style={online ? { display: 'none' } : undefined}
//         src="TODO"
//         alt="no internet"
//       />
//     </div>
//   );
// };

// export default App;