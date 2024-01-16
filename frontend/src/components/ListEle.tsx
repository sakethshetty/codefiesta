import React from 'react'

function ListEle(props : any) {
    const details = props.details
    console.log(details)
    return (
        <tr>
            <td>{details.rank+1}</td>
            <td>{details.username}</td>
            <td>{details.points}</td>
            <td>{details.contestCnt}</td>
        </tr>
    )
}

export default ListEle
