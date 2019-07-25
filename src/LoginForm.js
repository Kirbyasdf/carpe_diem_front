import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class LoginForm extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:4000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(response => {
        this.props.setCurrentUser(response);
        this.props.activateUser();
        this.props.history.push("/");
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Email</label>
        <input
          onChange={this.handleChange}
          name="email"
          value={this.state.email}
          placeholder="Email"
        />
        <label>Password</label>
        <input
          onChange={this.handleChange}
          type="password"
          name="password"
          value={this.state.password}
          placeholder="Password"
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
