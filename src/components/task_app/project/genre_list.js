import React from 'react';

const GenreList = (props) => {
    const { concert } = props;
    const { index } = props;


    return (
        <>{concert.genre[index]}, </>
    )
}

export default GenreList;