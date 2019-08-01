import React from "react";
import NavBar from "./NavBar";
import GoalCard from "./GoalCard";
import CreateGoalForm from "./CreateGoalForm";
import EditGoalForm from "./EditGoalForm";
import Settings from "./Settings";
import Countdown from "./CountDown"
import img from "./lifeLine.gif"


export default class HomePage extends React.Component {
  state = {
    page: 0,
    selectedGoal: "",
    settings: false
  };


  setPage = () => {
    switch (this.state.page) {
      case 0:
        return this.homepageRender();
      case 1:
        return this.createPageRender();
      case 2:
        return this.editPageRender();
      case 3:
        return this.settingPageRender();
    }
  };

  homePageReturn = () => {
    this.setState({
      page: 0,
      selectedGoal: "",
      settings: !this.state.settings
    });
  };

  settingPageset = () => {
    this.setState({ page: 3, settings: !this.state.settings });
  };

  settingPageRender = () => {
    return (
      <Settings
        user={this.props.user}
        setCurrentUser={this.props.setCurrentUser}
        homePageReturn={this.homePageReturn}
      />
    );
  };

  homepageRender = () => {
    return (
      <div>
        <button className="myButton" onClick={()=>this.toggalAllNotifications(this.props.user)} >{this.props.user.note_toggle? "Disable All Notifications" : "Enable All Notifications"}</button>
        <h1 style={{color: "white"}}>
          {" "}
           {this.props.user.name.toUpperCase()} you have have {this.props.user.tltl} years
           <br/>
            {this.props.user.tltl*365} days
             <br/>
            {(this.props.user.tltl*365)*24} hours
             <br/>
            {((this.props.user.tltl*365)*24)*60} minutes
          <Countdown user={this.props.user}/> <img className="lifeLine" src={img} />
        </h1>

        <button className="myButton" onClick={() => this.setState({ page: 1 })}>Add Goal</button>
        <br/>
        <br/>
        <br/>
          <div className="accordion">
          {this.props.user.goals
            ? this.props.user.goals.map(goal => {
                return (
                  <GoalCard
                    key={goal.id}
                    {...goal}
                    editGoalClick={this.editGoalClick}
                    deleteStateGoal={this.props.deleteStateGoal}
                    toggleGoalSatus={this.props.toggleGoalSatus}
                    user={this.props.user}
                    toggleGoalNotifications={this.props.toggleGoalNotifications}
                  />
                );
              })
            : null}
            </div>
      </div>
    );
  };

  createPageRender = () => {
    return (
      <CreateGoalForm
        addGoal={this.props.addGoal}
        user={this.props.user}
        homePageReturn={this.homePageReturn}
      />
    );
  };

  editGoalClick = goal => {
    this.setState({ selectedGoal: goal });
  };


  toggalAllNotifications = user => {
    console.log(user.note_toggle)
    fetch(`http://localhost:4000/api/v1/usernotetoggle`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        id: user.id,
        note_toggle: !user.note_toggle
      })
    })
      .then(res => res.json())
      .then(resUser => {
        console.log(resUser)
        this.props.setCurrentUser(resUser)
      });
  };


  render() {
    return (
      <div>
        <NavBar
          logOut={this.props.logOut}
          settingPageSet={this.settingPageset}
          settings={this.state.settings}
          homePageReturn={this.homePageReturn}
        />
        {this.state.selectedGoal ? (
          <EditGoalForm
            goal={this.state.selectedGoal}
            homePageReturn={this.homePageReturn}
            updateUserGoals={this.props.updateUserGoals}
          />
        ) : (
          this.setPage()
        )}
      </div>
    );
  }
}
