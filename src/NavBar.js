import React from "react";

export default class NavBar extends React.Component {
  render() {
    return (


      <div >
        <button className="myButton"
          onClick={
            this.props.settings
              ? this.props.homePageReturn
              : this.props.settingPageSet
          }
        >
          {this.props.settings ? "Home" : "Settings"}
        </button>
        <button className="myButton" onClick={this.props.logOut}>Log Out </button>
      </div>
    );
  }
}
