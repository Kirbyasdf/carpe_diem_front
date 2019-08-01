import React from "react";

export default class EditGoalForm extends React.Component {
  state = {
    name: this.props.goal.name,
    details: this.props.goal.details,
    notification_freq: this.props.goal.notification_freq,
    notification_type: this.props.goal.notification_type
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = e => {
    console.log(this.state)
    e.preventDefault();
    fetch(`http://localhost:4000/api/v1/goals/${this.props.goal.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(goal => {
        console.log(goal);
        this.props.updateUserGoals(goal);
        this.props.homePageReturn();
      });
  };

  render() {
    return (
      <h4>
      <form id="mainBody"  style={{color:"white"}} onSubmit={this.handleSubmit}>
        <label>Title</label>
        <input
          onChange={this.handleChange}
          name="name"
          value={this.state.name}
          placeholder="Title"
        />
        <br />
        <label>Descriptions</label>
        <input
          onChange={this.handleChange}
          type="details"
          name="details"
          value={this.state.details}
          placeholder="Description"
        />
        <br />
        <label>Notification Type </label>
        <div
          onChange={e => this.setState({ notification_type: +e.target.value })}
        >
          <select required>
            <option value="" />
            <option value="1">Text</option>
            <option value="2">Email</option>
          </select>
        </div>
        <br />
        <label>Notification frequency </label>
        <div onChange={e => this.setState({ notification_freq: +e.target.value })}>
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
