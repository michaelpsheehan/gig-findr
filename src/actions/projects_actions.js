export const createProject = (project) => {

    return (dispatch, getState) => {
        //  make an async call to get data


        // dispatch action to reducers to update state
        dispatch({ type: 'CREATE_PROJECT', project });

    }
};