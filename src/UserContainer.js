import React from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import LifeCalc from "./LifeCalc";

export default class UserContainer extends React.Component {

state = {
  page: 0
}

renderUserInput =()=> {
  console.log(this.state)
  switch (this.state.page) {
    case 0:
      return this.splashPageRender()
    case 1:
      return  <SignUpForm
              setCurrentUser={this.props.setCurrentUser}
              renderLC={this.renderLC}
              />
    case 2:
      return <LifeCalc
        activateUser={this.props.activateUser}
        setCurrentUser={this.props.setCurrentUser}
        currentUser={this.props.currentUser}
        />
      case 3:
      return <LoginForm
        activateUser={this.props.activateUser}
        setCurrentUser={this.props.setCurrentUser}
      />

      }
  };



splashPageRender = () =>{
  return <div id="splashPage">
            <button className="myButton" onClick={()=>this.setState({page: 3})} > Log In </button>
            <br/>
            <br/>
            <br/>
            <button className="myButton" onClick={()=>this.setState({page: 1})} > Sign Up </button>
          </div>
}



renderLC =() => {
  this.setState({page: 2})
}

  render() {
    console.log(this.state)
    return (
      <div id="splashBack">
      <br/>
      <br/>
      <br/>
      {this.renderUserInput()}
      </div>
    );
  }
}
