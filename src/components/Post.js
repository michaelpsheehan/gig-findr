import React, { Component } from 'react'
import Axios from 'axios'


class Post extends Component {
    state = {
        post: null
        // post: null
    }
    componentDidMount() {
        // console.log(this.props);

        let id = this.props.match.params.posts_id;
        // Axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        Axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
            .then(res => {
                this.setState({
                    title: res.data.title,
                    post: res.data.body
                })
                console.log(res)

            })
        // let id = this.props.match.params.posts_id



    }

    render() {

        // ? checks if a post exists first
        const post = this.state.post ? (
            // displays post if post exists
            <div className="post">
                <h4>{this.state.title}</h4>

                <p>{this.state.post}</p>
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

export default Post