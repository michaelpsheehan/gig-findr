import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

import Cat from '../images/RAW/cat-1.png'

import { connect } from 'react-redux'



class Home extends Component {

    //-----------Original axios request for Dummy data from the api

    // state = {
    //     posts: []
    // }
    // componentDidMount() {

    //     axios.get('https://jsonplaceholder.typicode.com/posts')
    //         .then(res => {
    //             this.setState({
    //                 posts: res.data.slice(0, 10)
    //             })
    //         })
    // }

    render() {
        console.log(this.props);
        const { posts } = this.props
        const postList = posts.length ?
            (posts.map(post => {
                return (
                    <div className='post card' key={post.id}>
                        <img src={Cat} alt="" />
                        <div className='card-content'>
                            <Link to={`/${post.id}`} >
                                <span className='card-title'>{post.title}</span>
                            </Link>
                            <p>{post.body}</p>
                        </div>
                    </div>
                )
            }
            )) :
            (<div>No Posts Yet..</div>)

        return (
            <>
                <h4>Home Page</h4>
                {postList}
            </>
        )

    }

};
const mapStateToProps = (state) => {
    return {
        posts: state.posts
    }
}

export default connect(mapStateToProps)(Home);