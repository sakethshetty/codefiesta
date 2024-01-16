import React, { useState } from 'react'
import { trpc } from '../lib/trpc';

function DelForm() {


  const [password, setPassword] = useState("");
  const [contestid, setContestId] = useState("");
  const deleteContest = trpc.deleteContest.useMutation();

  const handleSubmit = (e: any) => {
    // Clear the state variables

    e.preventDefault();
    console.log(contestid, password)
    const res = deleteContest.mutate({contestid : contestid, secretkey : password});
   
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Delete</h2>
      <div className="form-group">
        <label htmlFor="password">Contest Id:</label>
        <input
          id="contestid"
          type="number"
          value={contestid || ""}
          onChange={(e) => setContestId(e.target.value)}
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
      <button type="submit" className="btn btn-delete">
        Delete All
      </button>
    </form>
  )
}

export default DelForm