import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';

class UploadGigPhoto extends Component {

    render() {

        const { editText, onDrop, imgSrc, cropImage } = this.props
        console.log('edittext --', editText)
        console.log('onDrop --', onDrop)
        console.log('imgSrc --', imgSrc)
        console.log('cropImage --', cropImage)
        return (


            <div className="upload-gig-photo">
                {/* ------------------------------------------------------------------------------------------------------------------------------- */}
                {/* // --------------                    Add Gig Photo                                                   ------------------ */}

                <h5>{editText} Gig Photo</h5>
                <div className="dropzone-area">

                    <Dropzone
                        onDrop={onDrop}
                        multiple={false} accept='image/*' >
                        <div>Upload Optional Custom Photo</div>
                    </Dropzone>

                </div>
            </div>

        )
    }
}

export default UploadGigPhoto;