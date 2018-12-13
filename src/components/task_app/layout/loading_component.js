import React from 'react';
import { FiLoader } from 'react-icons/fi'

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
