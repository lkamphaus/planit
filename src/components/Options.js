import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import helpers from './tempHelp.js'
import OptionsButton from './OptionsButton.js';
import styles from '../styles/Event.module.css';

const Options = (props) => {
  let availability = helpers.CheckAvail(props.data.window, props.data.rsvps, props.data.duration/3600)
  let rsvpNum = props.data.rsvps.length
  let temp = Object.keys(availability).sort((a, b) => {
    return b - a
  })
  if(temp.length === 0) {
    return (
      <>
      <span>No one can attend the event, try decreasing the length or wait for more RSVPs</span>
      </>
    )
  }
  if (availability[rsvpNum]) {
    return (
      <>
      <span>All RSVPers can attend at: </span>
      <div className={styles.buttonlist}>
        {availability[rsvpNum].map( (time, key) => {
        return <OptionsButton time={time} key={key} handleSetTime={props.handleSetTime}/>
      })}
      </div>
      </>
    )
  }
  if (temp.length < 2) {
    return (
      <div>
        <h1>Select a Time!</h1>
        <p>{rsvpNum} people have responded to the event!</p>
        <p>Select a time</p>
        <span> {temp[0]} can make it at</span>
        {availability[temp[0]].map( (time, key) => {
        return <OptionsButton time={time} key={key} handleSetTime={props.handleSetTime}/>
      })}
      </div>
    )
  } else {
      return (
      <div>
        <h1>Select a Time!</h1>
        <p>{rsvpNum} people have responded to the event!</p>
        <p>Select a time</p>
        <span> {temp[0]} can make it at</span>
        {availability[temp[0]].map( (time, key) => {
        return <OptionsButton time={time} key={key} handleSetTime={props.handleSetTime}/>
      })}
        <span> {temp[1]} can make it at</span>
        {availability[temp[1]].map( (time, key) => {
        return <OptionsButton time={time} key={key} handleSetTime={props.handleSetTime}/>
      })}
      </div>
    )
    }
  }

export default Options;