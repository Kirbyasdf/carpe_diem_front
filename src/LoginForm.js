import React from "react";
import WebcamVerify from "./WebcamVerify"

const emailStyle = {
      position: "fixed",
      left: "50%",
      top: "55%"
    }

export default class LoginForm extends React.Component {
  state = {
    email: "",
    img: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (e, img) => {
    const image = img
    const email = this.state.email
    e.preventDefault();
    fetch("http://localhost:4000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        image,
        email,
      })
    })
      .then(res => res.json())
      .then(response => {
        console.log(response)
        if (response.message === false || response.status === 500){
          return alert("that ain't it")
        }
        this.props.setCurrentUser(response);
        this.props.activateUser();
      });
  };




  render() {
    return (
      <form id="mainBody" style={{color:"white"}} onSubmit={this.handleSubmit}>
        <WebcamVerify handleSubmit={this.handleSubmit}/>
        <input style={emailStyle}
          onChange={this.handleChange}
          name="email"
          value={this.state.email}
          placeholder="Email"
        />
      </form>
    );
  }
}
