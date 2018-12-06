import React from 'react'

const Avatar = ({ user, height }) => {

    // const photo = user && user.photoURL ? (<>{user.photoURL}</>) : ('../../../../public/assets/user.png');
    return (
        <div>

            <img height={height} className="avatar navbar--avatar"
                // src={user.photoURL}
                src={user.photoURL || '/assets/user.png'}
            />
        </div>

    )
}

export default Avatar