import React from 'react'

const Avatar = ({ user, height }) => {

    // const photo = user && user.photoURL ? (<>{user.photoURL}</>) : ('../../../../public/assets/user.png');
    return (

        <img height={height} className="circle"
            // src={user.photoURL}
            src={user.photoURL || '/assets/user.png'}
        />

    )
}

export default Avatar