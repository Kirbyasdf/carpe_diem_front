import React from 'react'
import {Link, BrowserRouter as Router, Route } from 'react-router-dom'


export default class GoalCard extends React.Component {


deleteGoal = (goalId) =>{
  let id = goalId
  fetch(`http://localhost:4000/api/v1/goals/${id}`, {
    method: "DELETE",
})
this.props.deleteStateGoal(goalId)
}

renderTimeStamp() {
  let today = Date.now()
  let createdDateArr = this.props.created_at.slice(0, 10).split("-").map(num => +num)
  let createdDate = new Date(createdDateArr[0], createdDateArr[1]-1, createdDateArr[2])
  let days = Math.floor((today-createdDate)/(1000*60*60*24))

  if (days === 0) {
      return ` today`
  } else {
      return ` ${days} ${(days === 1) ? `day ago` : "days ago"}`;
  }
}

sendText = () =>{
  let number = this.props.user.number
  let goalName = this.props.name
  let goaldDetails = this.props.details
  let tltl = this.props.user.tltl
  fetch ('http://localhost:4000/api/v1/sendtext', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accepts: "application/json"
    },
    body: JSON.stringify({
      number,
      goalName,
      goaldDetails,
      tltl

    })
  })

}

sendEmail = () =>{
  let email = this.props.user.email
  let name = this.props.user.name
  let title = this.props.name
  let details = this.props.details
  let tltl = this.props.user.tltl
  fetch ('http://localhost:4000/api/v1/sendemail', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accepts: "application/json"
    },
    body: JSON.stringify({
      email,
      name,
      title,
      details,
      tltl

    })
  })

}






    render(){
      return (
        <div>
       <h1>  Title: </h1>
        {this.props.name}
        <br/>
        <h3>  Description </h3>
        <br />
        {this.props.details}
        <br/>
       <h3>  You made this:{this.renderTimeStamp()} Age: {this.props.age} day
        </h3>
        <button onClick={this.sendText}> Send Text Notification </button>
        <br/>
        <button onClick={this.sendEmail}> Send Email Notification </button>
        <br/>
        <button onClick={()=>this.props.editGoalClick(this.props)}> Edit </button>
        <button onClick={()=>this.props.toggleGoalNotifications(this.props)}> {this.props.notifications? "Notifications Off" : "Notifications On"} </button>
        <button onClick={()=>this.deleteGoal(this.props.id)}> Delete </button>
        <button onClick={()=>this.props.toggleGoalSatus(this.props)}> {this.props.completed? "mark undone" : "mark done "} </button>

        {this.props.completed?
        <h2> completed</h2>
        :
        <h2> not completed</h2>
        }

        -----------------------------------
        -----------------------------------
        -----------------------------------
        </div>
      )
    }
  }
