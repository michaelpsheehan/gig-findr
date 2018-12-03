import React from 'react';
import { FiLoader } from 'react-icons/fi'
// import {FiHeart} from 'react-icons/lib/fi'

const LoadingComponent = () => {
    return (
        <>
            <div className="loading">
                <FiLoader className="icon--loading" />

                <h5>Loading...</h5>


            </div>
        </>
    )
}

export default LoadingComponent;
