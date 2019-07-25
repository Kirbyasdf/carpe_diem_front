import React from "react";
import LifeCalc from "./LifeCalc";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";

export default class SignUpForm extends React.Component {
  state = {
    name: "",
    number: "",
    email: "",
    password: "",
    passwordConfirmation: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };


  createUser = e => {
    if (this.state.password != this.state.passwordConfirmation) {
      return alert("passwords do not match");
      e.preventDefault();
    } else {
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
        .then(res => {
          this.props.setCurrentUser(res);
        });
    }
  };

limit = (element) =>{
    var max_chars = 10

    if(element.target.value.length > max_chars) {
        element.target.value = element.target.value.substr(0, max_chars);
    }
}

  // handleSubmit = () => {
  //   debugger
  // 	if(this.state.password === this.state.passwordConfirmation && this.state.password !== ""){
  // 		this.createUser()
  // 	} else {
  // 		alert("Passwords is invalid!")
  // 	}
  // }

  render() {
    return (
      <form>
        <label>Name</label>
        <input
          onChange={this.handleChange}
          name="name"
          value={this.state.name}
          placeholder="Name"
          required
        />
        <br />
        <label>Email</label>
        <input
          onChange={this.handleChange}
          name="email"
          type="email"
          value={this.state.email}
          placeholder="email"
          required
        />
        <br />
        <label>Number</label>
        <input
          onChange={this.handleChange}
          name="number"
          value={this.state.number}
          placeholder="number"
          onKeyDown={(e)=>this.limit(e)}
          onKeyUp={(e)=>this.limit(e)}
          required
        />
        <br />
        <label>Password</label>
        <input
          onChange={this.handleChange}
          type="password"
          name="password"
          value={this.state.password}
          placeholder="Password"
          required
        />
        <br />
        <label>Password Confirmation</label>
        <input
          onChange={this.handleChange}
          type="password"
          name="passwordConfirmation"
          value={this.state.passwordConfirmation}
          placeholder="Password Confirmation"
          required
        />
        <br />
        <Link to="/lc">
          <button onClick={e => this.createUser(e)}> Next </button>
        </Link>
      </form>
    );
  }
}
