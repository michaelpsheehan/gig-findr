import React from 'react'

const Avatar = ({ user, height }) => {

    return (
        <div>
            <img height={height} className="avatar navbar--avatar"
                src={user.photoURL || '/assets/user.png'}
                alt='user-avatar'
            />
        </div>

    )
}

export default Avatar