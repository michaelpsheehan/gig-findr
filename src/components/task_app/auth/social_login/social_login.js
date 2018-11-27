import React from 'react'
import { socialLogin } from '../../../../actions/authActions';
// import moduleName from 'react-icons/'
const SocialLogin = ({ SocialLogin }) => {
    return (
        <>
            <div>

                <button onClick={() => socialLogin('facebook')} className="facebook btn" >Login with Facebook</button>
                <span></span>
                <button onClick={() => socialLogin('google')} className="google btn" >Login with google</button>
            </div >
        </>

    )
};



export default SocialLogin

