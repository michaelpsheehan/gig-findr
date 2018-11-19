import React from 'react';
import { FiLoader } from 'react-icons/fi'
// import {FiHeart} from 'react-icons/lib/fi'

const LoadingComponent = () => {
    return (
        <>

            <FiLoader className="icon--loading" />
            <p>
                Loading...
               </p>

        </>
    )
}

export default LoadingComponent;
