const initState = {
    concerts: [

    ]
    // projects: [
    //     { id: '1', title: ' the first title of a project', content: 'blah blah blah ' },
    //     { id: '2', title: ' do some tasks that need doing', content: 'the task is a task that is a errand that needs to be completed ' },
    //     { id: '3', title: ' I also need to do this thing', content: 'i also ned to do this ' },
    // ]
}


const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_PROJECT':
            console.log('created project', action.project);
            return state;
        case 'CREATE_PROJECT_ERROR':
            console.log('create project error', action.err);
            return state;
        default:
            return state;
    }

}

export default projectReducer;