import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import helpers from './tempHelp.js'
import OptionsButton from './OptionsButton.js'
const Options = (props) => {
  let availability = helpers.CheckAvail(props.data.window, props.data.rsvps, 2)
  let rsvpNum = props.data.rsvps.length
  // console.log(props.data.window)
  // console.log(props.data.rsvps)
  console.log(availability)
  // console.log(availability[rsvpNum])
  let temp = Object.keys(availability).sort((a, b) => {
    return b - a
  })
  console.log(temp)
  if (availability[rsvpNum] === 5) {
    return (
      <div>
        <span>All RSVPers can attend at: </span>
        {availability[rsvpNum].map( (time, key) => {
        return <OptionsButton time={time} key={key}/>
      })}
      </div>
    )
  } else {
      return (
      <div>
        <span> {temp[0]} can make it at</span>
        {availability[temp[0]].map( (time, key) => {
        return <OptionsButton time={time} key={key}/>
      })}
        <span> {temp[1]} can make it at</span>
        {availability[temp[1]].map( (time, key) => {
        return <OptionsButton time={time} key={key}/>
      })}
      </div>
    )
    }
  }
  // return (
  //   <>
  //   {/* <div>
  //     {availability[rsvpNum].map( (time, key) => {
  //       return <OptionsButton time={time} key={key}/>
  //     })}
  //   </div> */}
  //     <ul>
  //       Everyone can go:
  //       {availability[rsvpNum].map( (time, key) => {
  //       return <OptionsButton time={time} key={key}/>
  //     })}
  //     </ul>
  //     <ul>
  //       All but 1 can go:
  //       {availability[rsvpNum - 1].map( (time, key) => {
  //       return <OptionsButton time={time} key={key}/>
  //     })}
  //     </ul>
  //   </>
  // )
//}

export default Options;