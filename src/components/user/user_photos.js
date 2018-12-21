import React from 'react';

const UserPhotos = ({ photos }) => {

    return (

        <div className="profile-photos">





            {photos && photos.map(pic => (
                <div key={pic.id} >
                    <div className="profile-photos__image">
                        <img key={pic.url} src={pic.url} alt='user-profile-images' />
                    </div>
                </div>
            ))}

        </div>
    )
}

export default UserPhotos;