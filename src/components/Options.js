import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import helpers from './tempHelp.js'
import OptionsButton from './OptionsButton.js'
const Options = (props) => {
  let availability = helpers.CheckAvail(props.data.window, props.data.rsvps, 2)
  let rsvpNum = props.data.rsvps.length
  let temp = Object.keys(availability).sort((a, b) => {
    return b - a
  })
  if (availability[rsvpNum]) {
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
        <p>{rsvpNum} people have responded to the event!</p>
        <p>Select a time</p>
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

export default Options;