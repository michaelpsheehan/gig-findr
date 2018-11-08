import React, { Component } from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'

import { deletePost } from '../actions/post_actions'


class Post extends Component {
    handleClick = () => {
        this.props.deletePost(this.props.post.id);
        this.props.history.push('/');
    }

    render() {
        console.log(this.props);

        // ? checks if a post exists first
        const post = this.props.post ? (
            // displays post if post exists
            <div className="post">
                <h4>{this.props.post.title}</h4>

                <p>{this.props.post.body}</p>
                <div className="center">
                    <button className="btn grey" onClick={this.handleClick} >
                        Delete Post
                    </button>
                </div>
            </div>
        ) : (
                // shows loading message if a post is loading
                <div className="center">Loading Post</div>
            );



        return (
            <div className='container'>
                {post}

            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deletePost: (id) => {
            dispatch(deletePost(id))
        }
    }
}
const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.post_id;
    return {
        post: state.posts.find(post => post.id === id),
        id: id
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)