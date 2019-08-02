import React from "react";

export default class Setting extends React.Component {
  state = {
    email: this.props.user.email,
    number: this.props.user.number,
    diabetes: this.props.user.diabetes,
    age: this.props.user.age,
    alochol: this.props.user.alochol,
    education: this.props.user.education,
    exercise: this.props.user.exercise,
    health: this.props.user.health,
    height: this.props.user.height,
    feet: this.props.user.feet,
    inch: this.props.user.inch,
    weight: this.props.user.weight,
    income: this.props.user.income,
    work: this.props.user.work,
    relationship: this.props.user.relationship
  };

  setHeight = () => {
    let height =
      Math.round(
        1000 * ((this.state.feet * 12 + parseInt(this.state.inch)) / 12)
      ) / 1000;
    if (height <= 4.583) {
      height = 4.667;
    }
    this.setState({ height: height }, () => this.updateUserSettings());
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setHeight();
  };

  updateUserSettings = () => {
    const feet = this.state.feet;
    const inch = this.state.inch;
    const id = this.props.user.id;
    const email = this.state.email;
    const number = this.state.number;
    const diabetes = this.state.diabetes;
    const alochol = this.state.alochol;
    const education = this.state.education;
    const exercise = this.state.exercise;
    const health = this.state.health;
    const income = this.state.income;
    const work = this.state.work;
    const relationship = this.state.relationship;
    const age = this.state.age;
    const height = this.state.height;
    const weight = this.state.weight;
    fetch(`http://localhost:4000/api/v1/updateuser`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        id,
        feet,
        inch,
        diabetes,
        alochol,
        education,
        exercise,
        health,
        income,
        work,
        relationship,
        age,
        height,
        weight
      })
    })
      .then(r => r.json())
      .then(userUpdate => {
        debugger;
        this.props.setCurrentUser(userUpdate);
        this.props.homePageReturn();
      });
  };

  render() {
    console.log(this.state);
    return (
      <div id="signUp" style={{ color: "white" }}>
        <form onSubmit={this.handleSubmit}>
          <label>Email</label>
          <input
            onChange={e => this.setState({ email: e.target.value })}
            name="email"
            value={this.state.email}
            placeholder="email"
          />

          <label>Number</label>
          <input
            onChange={e => this.setState({ number: +e.target.value})}
            name="number"
            value={this.state.number}
            placeholder="number"
          />

          <div onChange={e => this.setState({ age: +e.target.value })}>
            Age:
            <input value={this.state.age} type="number" min="18" max="85" />
          </div>
          <div onChange={e => this.setState({ weight: +e.target.value })}>
            Weight:
            <input
              value={this.state.weight}
              type="number"
              min="75"
              max="400"
            />{" "}
            lbs
          </div>
          <div>
            Height:
            <input
              value={this.state.feet}
              type="number"
              min="4"
              max="6"
              onChange={e => this.setState({ feet: +e.target.value })}
            />{" "}
            ft
            <input
              value={this.state.inch}
              type="number"
              min="0"
              max="11"
              onChange={e => this.setState({ inch: +e.target.value })}
            />{" "}
            in
          </div>
          <div onChange={e => this.setState({ education: e.target.value })}>
            Education:
            <select value={this.state.education}>
              <option value="_8_TO_11">High School Drop Out</option>
              <option value="HIGH_SCHOOL">High School</option>
              <option value="SOME_COLLEGE">College</option>
              <option value="COLLEGE_GRAD">College Level Equivalent</option>
            </select>
          </div>
          <div onChange={e => this.setState({ relationship: e.target.value })}>
            Relationship Status:
            <select value={this.state.relationship}>
              <option value="NEVER_MARRIED">Never Married</option>
              <option value="MARRIED">Married</option>
              <option value="SEPARATED">Separated</option>
              <option value="DIVORCED">Divorced</option>
              <option value="WIDOWED">Windowed</option>
            </select>
          </div>
          <div onChange={e => this.setState({ work: e.target.value })}>
            Work Status:
            <select value={this.state.work}>
              <option value="WORKING">Working</option>
              <option value="RETIRED">Retired</option>
            </select>
          </div>
          <div onChange={e => this.setState({ income: e.target.value })}>
            Income:
            <select value={this.state.income}>
              <option value="40MINUS"> {"<40k"} </option>
              <option value="40-60"> 40-60k </option>
              <option value="60-80"> 60-80k </option>
              <option value="80PLUS"> {">80k"} </option>
            </select>
          </div>
          <div onChange={e => this.setState({ exercise: e.target.value })}>
            Exercise:
            <select value={this.state.exercise}>
              <option value="NEVER">Never</option>
              <option value="RARELY">Rarely</option>
              <option value="_1_TO_3_PER_MONTH">1-3 Times per Month</option>
              <option value="_3_TO_4_PER_WEEK">3-4 Times per Week</option>
              <option value="_5_PLUS_PER_WEEK">5+ per Week</option>
            </select>
          </div>
          <div onChange={e => this.setState({ health: e.target.value })}>
            Health:
            <select value={this.state.health}>
              <option value="POOR">Poor</option>
              <option value="FAIR">Fair</option>
              <option value="GOOD">Good</option>
              <option value="VERY_GOOD">Very Good</option>
              <option value="EXCELLENT">Excellent</option>
            </select>
          </div>
          <div onChange={e => this.setState({ diabetes: e.target.value })}>
            Diabetes?:
            <select value={this.state.diabetes}>
              <option value="TRUE">Yes</option>
              <option value="FALSE">No</option>
            </select>
          </div>
          <div onChange={e => this.setState({ alochol: e.target.value })}>
            Drinking:
            <select value={this.state.alochol}>
              <option value="ZERO">None</option>
              <option value="_LT_2_PER_WEEK">Less than 2 per Week</option>
              <option value="_LT_1_PER_DAY">2-7 per Week</option>
              <option value="_MT_1_PER_DAY">8 or More per Week</option>
            </select>
          </div>
          <button className="myButton" type="submit">
            Change Settings
          </button>
        </form>
      </div>
    );
  }
}
