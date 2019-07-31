import React from "react";
import Webcam from "react-webcam";


export default class WebcamCapture extends React.Component {
  setRef = webcam => {
    this.webcam = webcam;
  };

  verify = () => {
    const imageSrc = this.webcam.getScreenshot();
    debugger
    fetch("http://localhost:4000/api/v1/imgecap",{
      method: "POST",
      headers: {
        "Content-Tpye": "application/json",
        Accepts: "appliocation/json"
      },
      body:JSON.stringify({
        imageSrc
      })
      })
  };

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };


    return (
      <div>

        <Webcam
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
          videoConstraints={videoConstraints}
        />
        <br />

        <button className="myButton" onClick={(e)=>this.props.handleSubmit(e, this.webcam.getScreenshot())}>Verify Login</button>
      </div>
    );
  }
}
