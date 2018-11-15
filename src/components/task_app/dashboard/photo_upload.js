import React, { Component } from 'react';
import Dropzone from 'react-dropzone'


class PhotoUpload extends Component {
    state = {
        files: [],
        fileName: ''

    }

    onDrop = (files) => {
        this.setState({
            files,
            fileName: files[0].name
        })
    }



    render() {
        return (
            <div>
                <div>1 UPload Photo</div>
                <Dropzone onDrop={this.onDrop} multiple={false} />
                <div>2 Resize Photo</div>
                <div>3 Preview and Upload
                {/* {this.state.files && <image src={this.state.files[0]} />} */}
                </div>
            </div>
        )
    }
}

export default PhotoUpload;
