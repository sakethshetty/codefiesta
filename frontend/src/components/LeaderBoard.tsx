import React from "react";
import ListEle from "./ListEle";

function LeaderBoard({ leaderboard }: { leaderboard: any }) {

  

  // console.log(list)
  return (
    <>
    {
      console.log(typeof leaderboard)
    }
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            <th>No. of Contests</th>
          </tr>
        </thead>
        <tbody>
          {
            Array.isArray(leaderboard) && leaderboard.map((element: any, index: any) => (<ListEle key={index} details={{ ...element, rank: index }}></ListEle>))
          }
        </tbody>
      </table>
    </>
  )
}

export default LeaderBoard

