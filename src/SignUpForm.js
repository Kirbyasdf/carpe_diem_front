import React from "react";
import WebcamCapture from "./WebcamCapture";

export default class SignUpForm extends React.Component {
  state = {
    name: "",
    number: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    user: "",
    signUp: false
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  createUser = e => {
    e.preventDefault();
    if (this.state.password != this.state.passwordConfirmation) {
      return alert("passwords do not match");
      e.preventDefault();
    }
    if (this.state.email === ""){
      alert("enter a valid email");
      e.preventDefault();
    }

    else {
      const name = this.state.name;
      const number = +this.state.number;
      const email = this.state.email;
      const password = this.state.password;

      fetch("http://localhost:4000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          number,
          password
        })
      })
        .then(r => r.json())
        .then(newUser => {
          this.setState({ user: newUser, signUp: true }, () =>
            this.props.setCurrentUser(this.state.user)
          );
        });
    }
  };

  limit = element => {
    var max_chars = 10;

    if (element.target.value.length > max_chars) {
      element.target.value = element.target.value.substr(0, max_chars);
    }
  };

  // handleSubmit = () => {
  //   debugger
  // 	if(this.state.password === this.state.passwordConfirmation && this.state.password !== ""){
  // 		this.createUser()
  // 	} else {
  // 		alert("Passwords is invalid!")
  // 	}
  // }

  render() {
    console.log(this.state.signUp);
    return (
      <div id="mainBody" style={{color:"white"}}>
        {this.state.signUp ? (
          <WebcamCapture
            renderLC={this.props.renderLC}
            email={this.state.email}
          />
        ) : (
          <form>
            <label>Name</label> ->
            <input
              onChange={this.handleChange}
              name="name"
              value={this.state.name}
              placeholder="Name"
              required
            />
            <br />
              <br/>
            <label>Email</label> ->
            <input
              onChange={this.handleChange}
              name="email"
              type="email"
              value={this.state.email}
              placeholder="email"
              required
            />
            <br />
              <br/>
            <label>Number</label> -> +1{" "}
            <input
              onChange={this.handleChange}
              name="number"
              value={this.state.number}
              placeholder="number"
              onKeyDown={e => this.limit(e)}
              onKeyUp={e => this.limit(e)}
              required
            />
            <br />
              <br/>
            <label>Password</label> ->
            <input
              onChange={this.handleChange}
              type="password"
              name="password"
              value={this.state.password}
              placeholder="Password"
              required
            />
            <br />
              <br/>
            <label>Password Confirmation</label> ->
            <input
              onChange={this.handleChange}
              type="password"
              name="passwordConfirmation"
              value={this.state.passwordConfirmation}
              placeholder="Password Confirmation"
              required
            />
            <br />
              <br/>
            <button className="myButton" onClick={e => this.createUser(e)}> Next </button>
          </form>
        )}
      </div>
    );
  }
}
