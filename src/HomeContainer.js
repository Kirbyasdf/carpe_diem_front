import React from "react";
import HomePage from "./HomePage";
import UserContainer from "./UserContainer";

export default class HomeContainer extends React.Component {
  state = {
    activeUser: false,
    currentUser: ""
  };

  activateUser = () => this.setState({ activeUser: !this.state.activeUser });

  addGoal = goal => {
    let updateUser = { ...this.state.currentUser };
    updateUser.goals.push(goal);
    this.setState({ currentUser: updateUser });
  };

  updateUserGoals = goal => {
    let updateUser = { ...this.state.currentUser };
    let updateGoals = updateUser.goals.map(g => {
      if (goal.id === g.id) {
        return goal;
      } else {
        return g;
      }
    });
    updateUser.goals = updateGoals;
    this.setState({ currentUser: updateUser });
  };

  deleteStateGoal = id => {
    let updateUser = { ...this.state.currentUser };
    let newGoals = updateUser.goals.filter(g => g.id != id);
    updateUser.goals = newGoals;
    this.setState({ currentUser: updateUser });
  };

  setCurrentUser = user => {
    this.setState({ currentUser: user });
  };

  logOut = () => {
    this.setState({
      activeUser: !this.state.activeUser,
      currentUser: null
    });
    // localStorage.removeItem("token")
    this.props.history.push("/");
  };

  toggleGoalSatus = goal => {
    fetch(`http://localhost:4000/api/v1/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        id: goal.id,
        completed: !goal.completed
      })
    })
      .then(res => res.json())
      .then(resGoal => {
        let updateGoals = this.state.currentUser.goals.map(goal => {
          if (goal.id === resGoal.id) {
            goal.completed = !goal.completed;
            return goal;
          } else {
            return goal;
          }
        });
        let updateUser = { ...this.state.currentUser };
        updateUser.goals = updateGoals;
        this.setState({ currentUser: updateUser });
      });
  };

  toggleGoalNotifications = goal => {
    fetch(`http://localhost:4000/api/v1/notetoggle`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        id: goal.id,
        notifications: !goal.notifications
      })
    })
      .then(res => res.json())
      .then(resGoal => {
        let updateGoals = this.state.currentUser.goals.map(goal => {
          if (goal.id === resGoal.id) {
            goal.notifications = !goal.notifications;
            return goal;
          } else {
            return goal;
          }
        });
        let updateUser = { ...this.state.currentUser };
        updateUser.goals = updateGoals;
        this.setState({ currentUser: updateUser });
      });
  };

  render() {
    return (
      <div>
        {this.state.activeUser ? (
          <HomePage
            deleteStateGoal={this.deleteStateGoal}
            logOut={this.logOut}
            user={this.state.currentUser}
            updateUserGoals={this.updateUserGoals}
            toggleGoalSatus={this.toggleGoalSatus}
            addGoal={this.addGoal}
            toggleGoalNotifications={this.toggleGoalNotifications}
            setCurrentUser={this.setCurrentUser}
          />
        ) : (
          <div>
          <UserContainer
            activateUser={this.activateUser}
            currentUser={this.state.currentUser}
            setCurrentUser={this.setCurrentUser}
          />


          </div>


        )}
      </div>
    );
  }
}
