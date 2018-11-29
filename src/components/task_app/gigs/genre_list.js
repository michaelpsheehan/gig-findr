import React from 'react';

const GenreList = ({ concert, index }) => {



    return (
        <>{concert.genre[index]}, </>
    )
}

export default GenreList;