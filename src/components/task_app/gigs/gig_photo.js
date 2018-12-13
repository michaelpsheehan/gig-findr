import React from 'react';
import format from 'date-fns/format'
import LoadingComponent from '../layout/loading_component';
const GigPhoto = ({ concerts, auth }) => {



    const gigToDate = concerts.concertDate && concerts.concertDate.toDate();
    // const gigDate = concerts.concertDate && format(gigToDate, 'dddd Do MMMM');
    const gigDate = concerts.concertDate && format(gigToDate, 'Do MMM YYYY');

    const image = concerts.gigPhotoURL ? (<><img className="gig-photo__image"
        // height="400px" 
        // className="responsive-img"
        // width="600px"
        width="100%"

        // src={concerts.gigPhotoURL && concerts.gigPhotoURL || '../../../../public/assets/default-gig-image.jpg'}
        src={concerts.gigPhotoURL}

    />
    </>) :
        (<><div className="gig-photo-placeholder">
            <img className="gig-photo__image" src="/assets/default-gig-image.jpg" />
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