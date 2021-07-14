import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import { INITIAL_EVENTS, createEventId, cleanData } from './helpers/event-utils'
import Button from '@material-ui/core/Button'
import style from '.././styles/Availability.module.css'


export default function TimeBlock(props) {

  const [currentEvents, setCurrentEvents] = useState([]);

  const handleDateSelect = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect()

    calendarApi.addEvent({
      id: createEventId(),
      title: 'new availability',
      start: selectInfo.startStr,
      end: selectInfo.endStr,
    })

  }

  const handleEventClick = (clickInfo) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  const handleEvents = (events) => {
    setCurrentEvents(events)
  }

  const saveTimeSlots = () => {
    const availability = cleanData(currentEvents);
    props.onClose(null, availability);
  }

  return (
    <div>
      <FullCalendar
        plugins={[interactionPlugin, timeGridPlugin, dayGridPlugin]}
        initialView='timeGridWeek'
        editable={true}
        selectable={true}
        selectMirror={true}
        nowIndicator={true}
        initialEvents={INITIAL_EVENTS}
        select={handleDateSelect}
        eventClick={handleEventClick}
        eventsSet={handleEvents}
        eventColor='#985c9c'
      />
      <div className={style.submit}>
        <Button autoFocus onClick={saveTimeSlots} variant="outlined" color="primary">
          Submit
        </Button>
      </div>
   </div>
  )
}

