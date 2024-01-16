import React, {useState} from 'react'
import { trpc } from '../lib/trpc';

function AddForm() {

  const [contestid, setContestId] = useState("");
  const [password, setPassword] = useState("");
  const addContest = trpc.addContest.useMutation()

  async function handleSubmit(e:any) {

    e.preventDefault();

    const res = await addContest.mutate({contestid:contestid, secretkey: password})
    console.log(res)
    
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Add Contest</h2>
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
      <div className="form-buttons">
        <button type="submit" className="btn btn-set">
          Add contest
        </button>
      </div>
      {addContest.error && <p>Something went wrong!</p>}
    </form>
  )
}

export default AddForm