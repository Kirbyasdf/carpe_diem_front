import React from "react";

export default class CreateGoalForm extends React.Component {
  state = {
    name: "",
    details: "",
    notification_type: 0,
    notification_freq: 0,
    user_id: this.props.user.id
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:4000/api/v1/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(goal => {
        this.props.addGoal(goal);
        this.props.homePageReturn();
      });
  };

  render() {
    return (
      <h4>
      <form  id="signUp" style={{color:"white"}} onSubmit={this.handleSubmit}>
        <br/>
        <input
          onChange={this.handleChange}
          name="name"
          value={this.state.name}
          placeholder="Title"
        />
        <br />
        <label>Descriptions</label>
        <br/>
        <textarea class="textarea"
          onChange={this.handleChange}
          type="details"
          name="details"
          value={this.state.details}
          placeholder="Description"
          >
          </textarea>
        <br />
        <label>Notification Type </label>
        <div
          onChange={e => this.setState({ notification_type: e.target.value })}
        >
          <select required>
            <option value="" />
            <option value="1">Text</option>
            <option value="2">Email</option>
            <option value="3">Both</option>
          </select>
        </div>
        <br />
        <label>Notification frequency </label>
        <div onChange={e => this.setState({ notification_freq: e.target.value })}>
          <select required>
            <option value="" />
            <option value="1">Every Month</option>
            <option value="2">Every 3 Months</option>
            <option value="3">Every 6 Months</option>
            <option value="4">Every Year</option>
          </select>
        </div>
        <br />
        <button className="myButton" type="submit">Submit</button>
      </form>
        </h4>
    );
  }
}
