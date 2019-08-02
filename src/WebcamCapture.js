import React from "react";
import Webcam from "react-webcam";


export default class WebcamCapture extends React.Component {
  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = (e) => {
    e.preventDefault()
    const email = this.props.email
    const imageSrc = this.webcam.getScreenshot();

    fetch("http://localhost:4000/api/v1/imgecap",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body:JSON.stringify({
        imageSrc,
        email
      })
    }).then(r=>r.json())
    .then(r=>{
      console.log(r)
      this.props.renderLC()

    })
  };

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };


    return (
        <div className="photoBooth">

          <Webcam
            audio={false}
            height={350}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={350}
            videoConstraints={videoConstraints}
          />
          <br />

          <button className="myButton inputButton" onClick={(e)=>this.capture(e)}>Capture photo</button>
        </div>
    );
  }
}
