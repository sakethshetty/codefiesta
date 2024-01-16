import React, {useState} from 'react'
import axios from "axios";

function SetForm() {

  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [attendance, setAttendance] = useState("");
  const [password, setPassword] = useState("");

  // Define a function to handle form submission
  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Do something with the form data here
    // axios("http://localhost:3000/editScore",
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     data: {
    //       'password': password,
    //       'name': name,
    //       'score': score,
    //       'attendance': attendance
    //     }
    //   })
    //   .then((res) => {
    //     alert("Edited!")
    //   })
    //   .catch((err) => {
    //     alert("Unauthorized Access!")
    //   })
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Edit Score</h2>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="score">Score:</label>
        <input
          id="score"
          type="number"
          value={score || ""}
          onChange={(e) => setScore(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="attendance">Attendance:</label>
        <input
          id="attendance"
          type="number"
          value={attendance || ""}
          onChange={(e) => setAttendance(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="text"
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-buttons">
        <button type="submit" className="btn btn-set">Set</button>
      </div>
    </form>
  )
}

export default SetForm