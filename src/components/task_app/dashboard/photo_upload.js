import React, { Component } from 'react';
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone';
import { uploadImage } from '../../../actions/projects_actions'
import { toastr } from 'react-redux-toastr'
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'

import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux'
import { querystring } from '@firebase/util';

const query = ({auth})  => {
    return [
       {
           collection: 'users',
           doc: auth.uid
       } 
    ]
}

const actions = {
    uploadImage
}


const mapStateToProps = (state) => ({
    auth: state.firebase.auth,
    profile: state.firestore.profile,
    photo: state.firestore.photoURL
})


class PhotoUpload extends Component {
    state = {
        files: [],
        fileName: ''

    }
    uploadImage = async () => {
        try {
            await this.props.uploadImage(this.state.image, this.state.fileName);
            this.cancelCrop();
            toastr.success('Success!', 'Photo has been uploaded')
        } catch (error) {
            toastr.error('Oops', error.message);
        }

    }




    cropImage = () => {
        if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
            return;
        }
        this.refs.cropper.getCroppedCanvas().toBlob(blob => {
            let imageUrl = URL.createObjectURL(blob);
            this.setState({
                cropResult: imageUrl,
                image: blob

            })
        }, 'image / jpg')
    }



    cancelCrop = () => {
        this.setState({
            files: [],
            image: {},
            imgSrc: null
        })

    }


    onDrop = (files) => {
        this.setState({
            files,
            fileName: files[0].name
        })

        const currentFile = files[0]
        const reader = new FileReader()
        reader.addEventListener('load', () => {
            console.log(reader.result)
            this.setState({
                imgSrc: reader.result
            })
        }, false)
        reader.readAsDataURL(currentFile)
    }



    render() {
        const imgSrc = this.state.imgSrc;
        const imgSrc2 = this.state.files[0];



const {profile, photo} = this.props;




        return (
            <>
            <div>{photo}</div>
                <div>

                    <Dropzone
                        onDrop={this.onDrop}
                        multiple={false}
                        accept='image/*'
                        >
                        
                        <div>1 UPload Photo</div>
                        <div>
                        </div>

                    </Dropzone>
                    <div>2 Resize Photo</div>
                    {this.state.files[0] && 
                    <Cropper
                        style={{ height: 200, width: '100%' }}
                        ref='cropper'
                        // src={this.state.files[0].preview}
                        src={imgSrc}
                        aspectRatio={1}
                        viewMode={0}
                        dragMode='move'
                        guides={false}
                        scalable={true}
                        cropBoxMovable={true}
                        cropBoxResizable={true}
                        crop={this.cropImage}
                    />
                } */}
                    <div>3 Preview and Upload

                        {/* {imgSrc !== null ?
                            <div>
                                {/* {imgSrc} */}
                                {/* < img height="1000px"
                                    // width="200px" 
                                    src={imgSrc} />
                            </div> */}
                            {/* : ''} */} */}




                            
                        {/* </div> */}
                        </div>

                        {this.state.files[0] && 
                        <img  className="photo-box"
                        height="200px" 
                        // src={this.state.files[0]} 
                        src={this.state.cropResult} 
                        // src={imgSrc} 
                        />
                        }
                    <button width='200px' onClick={this.uploadImage}>
                        Upload Button
                    </button>
                </div>
            </>
        )
    }
}

export default compose(
connect(mapStateToProps, actions),
firestoreConnect(auth => query(auth))
)(PhotoUpload);
