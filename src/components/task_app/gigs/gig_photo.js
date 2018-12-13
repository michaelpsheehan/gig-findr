import React from 'react';
import format from 'date-fns/format'
const GigPhoto = ({ concerts, auth }) => {
    const gigToDate = concerts.concertDate && concerts.concertDate.toDate();
    const gigDate = concerts.concertDate && format(gigToDate, 'Do MMM YYYY');

    // if a gig image is currently uploading show a  fallback until the loading has finished
    const image = concerts.gigPhotoURL ? (
        <>
            <img className="gig-photo__image" width="100%" src={concerts.gigPhotoURL} alt="gig" />
        </>) :
        (
            <>
                <div className="gig-photo-placeholder">
                    <img className="gig-photo__image" src="/assets/default-gig-image.jpg" alt="default-placeholder-while-gig-uploads" />
                    <h3 className='gig-photo__title'>{concerts.band}</h3>
                    <div className="gig-photo__text">
                        <h4 className="gig-photo__text-city">{concerts.city}</h4 >
                        <h4 className="gig-photo__text-date">{gigDate}</h4>
                    </div>
                </div></>);



    return (
        <>
            {concerts && <>
                <div className="gig-photo">
                    {image}
                    <h3 className='gig-photo__title'>{concerts.band}</h3>
                    <div className="gig-photo__text">
                        <h4 className="gig-photo__text-city">{concerts.city}</h4 >
                        <h4 className="gig-photo__text-date">{gigDate}</h4>
                    </div>
                </div>
            </>}
        </>
    )
}

export default GigPhoto