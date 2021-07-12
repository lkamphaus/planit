import React, {useState} from 'react'
import Button from '@material-ui/core/Button';


const Options = () => {

  return (
    <>
      <ul>
        Everyone can go:
        <li>
          <button>Friday July 23th at 9 pm</button>
        </li>
        <li>
          <button>Friday July 23th at 10 pm</button>
        </li>
        <li>
          <button>Friday July 23th at 11 pm</button>
        </li>
      </ul>
      <ul>
        All but 1 can go:
        <li>
          <button>Friday July 23th at 8 am</button>
        </li>
        <li>
          <button>Friday July 23th at 12:30 pm</button>
        </li>
        <li>
          <button>Friday July 23th at 8 pm</button>
        </li>
      </ul>
    </>
  )
}

export default Options;