import React from 'react'
//import {ConnectPlugin} from '../../../connectPlugins';
import AccountQuickLinks from './AccountQuickLinks'
import SignINLINks from './SignINLINks';
function AuthSignIN({auth}) {
    
  return (
<>
{auth.isLoggedIn ? (<AccountQuickLinks isLoggedIn={true} />) : 
                (
                    <>
                    <SignINLINks />
                 
                  </>
                )}

</>
  )
}
export default AuthSignIN