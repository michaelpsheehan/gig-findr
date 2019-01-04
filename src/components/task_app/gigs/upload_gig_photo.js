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

            // <>
            <div className="upload-gig-photo">
                {/* ------------------------------------------------------------------------------------------------------------------------------- */}
                {/* // --------------                    Add Gig Photo                                                   ------------------ */}

                <h5>{editText} Gig Photo</h5>
                <div className="dropzone-area">

                    <Dropzone
                        // onDrop={this.onDrop}
                        onDrop={onDrop}
                        multiple={false} accept='image/*' >
                        <div>Upload Optional Custom Photo</div>
                    </Dropzone>

                    {/* ------------------------------------------------------------------------------------------------------------------------------- */}
                    {/* // --------------                    Crop Image                                                  ------------------ */}


                    {/* <Cropper
                        style={{ height: 200, width: '100%' }}
                        ref='cropper'
                        src={imgSrc}
                        aspectRatio={16 / 9}
                        viewMode={0}
                        dragMode='move'
                        guides={false}
                        scalable={true}
                        cropBoxMovable={true}
                        cropBoxResizable={true}
                        // crop={this.cropImage}
                        crop={cropImage}
                    /> */}



                </div>
            </div>
            // </>
        )
    }
}

export default UploadGigPhoto;