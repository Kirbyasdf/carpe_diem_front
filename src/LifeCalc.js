import React from "react";
import Countdown from "./CountDown"
import img from './grim.png'

export default class LifeCalc extends React.Component {
  state = {
    completed: false,
    gender: "",
    diabetes: "",
    age: 0,
    alochol: "",
    education: "",
    exercise: "",
    health: "",
    height: 0,
    feet: 0,
    inch: 0,
    weight: 0,
    race: "",
    income: "",
    work: "",
    relationship: ""
  };

  complete = () => this.setState({ completed: true });

  setHeight = () => {
    let height =
      Math.round(
        1000 * ((this.state.feet * 12 + parseInt(this.state.inch)) / 12)
      ) / 1000;
    if (height <= 4.583) {
      height = 4.667;
    }

    this.setState({ height: height }, () => this.getLifeExp());
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setHeight();
  };

  getLifeExp = () => {
    const inch = this.state.inch
    const feet = this.state.feet
    const gender = this.state.gender;
    const diabetes = this.state.diabetes;
    const alochol = this.state.alochol;
    const education = this.state.education;
    const exercise = this.state.exercise;
    const health = this.state.health;
    const race = this.state.race;
    const income = this.state.income;
    const work = this.state.work;
    const relationship = this.state.relationship;
    const age = this.state.age;
    const height = this.state.height;
    const weight = this.state.weight;
    fetch(`http://localhost:4000/api/v1/users/${this.props.currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        feet,
        inch,
        gender,
        diabetes,
        alochol,
        education,
        exercise,
        health,
        race,
        income,
        work,
        relationship,
        age,
        height,
        weight
      })
    })
      .then(r => r.json())
      .then(newUser => {
        this.props.setCurrentUser(newUser);
        this.complete();
        const redirect = () =>
          setTimeout(() => {
            this.props.activateUser();
            clearTimeout(redirect);
          }, 10000);
        redirect();
      });
  };

  render() {
    return (
      <div id="mainBody" style={{color:"white"}}>
        {this.state.completed ? (
          <div>
            <h2>
              Your Life Expectency is
              {" "} <h1>{this.props.currentUser.life_exp} years....</h1>
              </h2>
              <br/>
              <h2>
              that mean you have {this.props.currentUser.tltl} years left to....
              </h2>
              <br/>
              <h1>
              MAKE ALL YOUR DREAMS COME TRUE ;)!
              </h1>
              <br/>
                <h2>
                Time Started {this.props.currentUser.life_exp - this.props.currentUser.tltl} years ago....
                </h2>
                  <h1>
                Time left
                 <Countdown user={this.props.currentUser} />
                </h1>
                <div id="grim" >
                  <img src={img} />
                </div>
            </div>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <div onChange={e => this.setState({ gender: e.target.value })}>
              Gender:
              <select required>
                <option value="" />
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            </div>
            <br/>
            <div onChange={e => this.setState({ race: e.target.value })}>
              Race:
              <select required>
                <option value="" />
                <option value="WHITE">White</option>
                <option value="BLACK">Black</option>
                <option value="HISPANIC">Hispanic</option>
                <option value="OTHER">Asian</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
              <br/>
            <div onChange={e => this.setState({ age: +e.target.value })}>
              Age:
              <input type="number" min="18" max="85" required />
            </div>
              <br/>
            <div onChange={e => this.setState({ weight: +e.target.value })}>
              Weight:
              <input type="number" min="75" max="400" required /> lbs
            </div>
              <br/>
            <div>
              Height:
              <input
                required
                type="number"
                min="4"
                max="6"
                onChange={e => this.setState({ feet: +e.target.value })}
              />{" "}
              ft
              <input
                type="number"
                min="0"
                max="11"
                onChange={e => this.setState({ inch: +e.target.value })}
              />{" "}
              in
            </div>
              <br/>
            <div onChange={e => this.setState({ education: e.target.value })}>
              Education:
              <select required>
                <option value="" />
                <option value="_8_TO_11">High School Drop Out</option>
                <option value="HIGH_SCHOOL">High School</option>
                <option value="SOME_COLLEGE">Some College</option>
                <option value="COLLEGE_GRAD">College Level </option>
                <option value="COLLEGE_GRAD">College Level Equivalent</option>
              </select>
            </div>
              <br/>
            <div
              onChange={e => this.setState({ relationship: e.target.value })}
            >
              Relationship Status:
              <select required>
                <option value="" />
                <option value="NEVER_MARRIED">Never Married</option>
                <option value="MARRIED">Married</option>
                <option value="SEPARATED">Separated</option>
                <option value="DIVORCED">Divorced</option>
                <option value="WIDOWED">Windowed</option>
              </select>
            </div>
              <br/>
            <div onChange={e => this.setState({ work: e.target.value })}>
              Work Status:
              <select required>
                <option value="" />
                <option value="WORKING">Working</option>
                <option value="RETIRED">Retired</option>
              </select>
            </div>
              <br/>
            <div onChange={e => this.setState({ income: e.target.value })}>
              Income:
              <select required>
                <option value="" />
                <option value="40MINUS"> {"<40k"} </option>
                <option value="40-60"> 40-60k </option>
                <option value="60-80"> 60-80k </option>
                <option value="80PLUS"> {">80k"} </option>
              </select>
            </div>
              <br/>
            <div onChange={e => this.setState({ exercise: e.target.value })}>
              Exercise:
              <select required>
                <option value="" />
                <option value="NEVER">Never</option>
                <option value="RARELY">Rarely</option>
                <option value="_1_TO_3_PER_MONTH">1-3 Times per Month</option>
                <option value="_3_TO_4_PER_WEEK">3-4 Times per Week</option>
                <option value="_5_PLUS_PER_WEEK">5+ per Week</option>
              </select>
            </div>
              <br/>
            <div onChange={e => this.setState({ health: e.target.value })}>
              Health:
              <select required>
                <option value="" />
                <option value="POOR">Poor</option>
                <option value="FAIR">Fair</option>
                <option value="GOOD">Good</option>
                <option value="VERY_GOOD">Very Good</option>
                <option value="EXCELLENT">Excellent</option>
              </select>
            </div>
              <br/>
            <div onChange={e => this.setState({ diabetes: e.target.value })}>
              Diabetes?:
              <select required>
                <option value="" />
                <option value="TRUE">Yes</option>
                <option value="FALSE">No</option>
              </select>
            </div>
              <br/>
            <div onChange={e => this.setState({ alochol: e.target.value })}>
              Drinking:
              <select required>
                <option value="" />
                <option value="ZERO">None</option>
                <option value="_LT_2_PER_WEEK">Less than 2 per Week</option>
                <option value="_LT_1_PER_DAY">2-7 per Week</option>
                <option value="_MT_1_PER_DAY">8 or More per Week</option>
              </select>
            </div>
              <br/>
            <button className="myButton" type="submit">finish</button>
          </form>
        )}
      </div>
    );
  }
}
