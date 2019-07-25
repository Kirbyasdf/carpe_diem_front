import React from "react";
import Settings from "./Settings";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";

export default class NavBar extends React.Component {
  render() {
    return (
      <div>
        <button
          onClick={
            this.props.settings
              ? this.props.homePageReturn
              : this.props.settingPageSet
          }
        >
          {this.props.settings ? "Home" : "Settings"}
        </button>
        <button onClick={this.props.logOut}>Log Out </button>
      </div>
    );
  }
}
