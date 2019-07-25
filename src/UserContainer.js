import React from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import LifeCalc from "./LifeCalc";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WebcamCapture from "./WebcamCapture"


export default class UserContainer extends React.Component {
  render() {
    return (
      <div>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        <div>
          <Route
            path="/login"
            render={routProps => (
              <div>

              <LoginForm
                {...routProps}
                activateUser={this.props.activateUser}
                setCurrentUser={this.props.setCurrentUser}
              />
              <WebcamCapture />
              </div>

            )}
          />

          <Route
            path="/signup"
            render={routProps => (
              <div>
              <SignUpForm
                {...routProps}
                setCurrentUser={this.props.setCurrentUser}
              />
              <WebcamCapture />
              </div>
            )}
          />
          <Route
            path="/lc"
            render={routProps => (
              <LifeCalc
                {...routProps}
                activateUser={this.props.activateUser}
                setCurrentUser={this.props.setCurrentUser}
                currentUser={this.props.currentUser}
              />
            )}
          />
        </div>
      </div>
    );
  }
}
