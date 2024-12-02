import React from 'react'
import { Link } from 'react-router'

const bbsList = ['first']

export default () => {
  return <div>
    {bbsList.map((ele:string)=>(
        <li key={ele}>
            <Link to={{pathname:`/bbs/${ele}`}} >
            {ele}
            </Link>
        </li>
    ))}
  </div>
}
