import React, { Component } from 'react';
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone';
import { uploadImage, deletePhoto, setMainPhoto } from '../../../actions/gig_actions'
import { toastr } from 'react-redux-toastr'
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'


const query = ({ auth }) => {
    return [
        {
            collection: 'users',
            doc: auth.uid,
            subcollections: [{ collection: 'photos' }],
            storeAs: 'photos'
        }
    ];
};


const actions = {
    uploadImage,
    deletePhoto,
    setMainPhoto
}
const mapStateToProps = (state) => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    photos: state.firestore.ordered.photos

})


class PhotoUpload extends Component {
    state = {
        files: [],
        fileName: '',
        cropResult: null,
        image: {}

    }
    uploadImage = async () => {
        try {
            await this.props.uploadImage(this.state.image, this.state.fileName);
            this.cancelCrop();
            toastr.success('Success!', 'Your photo has been uploaded')
        } catch (error) {
            toastr.error('Oops', error.message);
        }

    }

    handlePhotoDelete = (photo) => () => {
        try {
            this.props.deletePhoto(photo);
            toastr.success('Success!', 'Your photo has been deleted')
        } catch (error) {
            toastr.error('Oops', error.message)
        }
    }

    handleSetMainPhoto = (photo) => async () => {

        try {
            this.props.setMainPhoto(photo);

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
            image: {}
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

            this.setState({
                imgSrc: reader.result
            })
        }, false)
        reader.readAsDataURL(currentFile)
    }



    render() {
        const imgSrc = this.state.imgSrc;
        const { profile, photos, hasProfilePic } = this.props;

        let PhotosWithoutMainProfilePic;
        if (photos) {
            PhotosWithoutMainProfilePic = photos.filter(photo => {
                return photo.url !== profile.photoURL;
            })
        }

        return (
            <>
                <h4>Your photos</h4>
                <div className="profile-photos">
                    {photos && PhotosWithoutMainProfilePic.map(pic => (
                        <div key={pic.id} >
                            <div className="profile-photos__image">
                                <img key={pic.url} src={pic.url} alt='profile-photos' />
                                <button onClick={this.handlePhotoDelete(pic)} className="btn btn--delete" width='200px'>Delete</button>
                                <button onClick={this.handleSetMainPhoto(pic)} className="btn btn--set-photo" width='200px'>Set as Profile</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <div className="profile-photo-upload">
                        <Dropzone
                            onDrop={this.onDrop}
                            multiple={false}
                            accept='image/*'
                            preview="false"
                        >
                            <div>{hasProfilePic}</div>
                            <div>
                            </div>

                        </Dropzone>
                        {this.state.files[0] &&
                            <div className="cropper-area" >
                                <Cropper
                                    style={{ height: 200, width: '100%' }}
                                    ref='cropper'
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
                            </div>
                        }
                    </div>
                    <div>
                    </div>
                    <button className="btn btn--profile-upload" width='200px' onClick={this.uploadImage}>
                        Upload Photo
                    </button>
                </div>
            </>
        )
    }
}



export default compose(
    connect(mapStateToProps, actions),
    firestoreConnect((auth) => query(auth))
)(PhotoUpload);
