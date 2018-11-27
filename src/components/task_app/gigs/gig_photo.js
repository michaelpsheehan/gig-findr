import React from 'react';

const GigPhoto = ({ concerts, auth }) => {
    // console.log('the gig photo in the gig hoto component is', concerts);
    // // console.log('the gigphoto in the gig hoto component is', concerts.gigImages);
    // console.log('the gig photo in the gig hoto component is', concerts.gigPhotoURL);
    // console.log('the city the gig hoto component is', concerts.city);

    // console.log('auth.uid = ' + auth.uid);
    // console.log('concerts = ', concerts.hostUid);
    return (
        <>
            {/* <h5>Gig photo</h5> */}
            {concerts && <>
                <h3>{concerts.band}</h3>
                <img
                    // height="400px" 
                    // className="responsive-img"
                    width="600px"
                    src={concerts.gigPhotoURL} />
            </>}


            {/* <img src={user.photoURL} /> */}
        </>
    )


}

export default GigPhoto