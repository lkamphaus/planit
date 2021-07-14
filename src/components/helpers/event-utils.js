let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

const withoutTime = (dateTime, hours, minutes) => {
  var date = new Date(dateTime.getTime());
  date.setHours(hours, minutes, 0, 0);
  return date;
}

const startDate = withoutTime( new Date(), 9, 0 );
const endDate = withoutTime( new Date(), 9, 30 );

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'new availability',
    start: startDate,
    end: endDate
  }
]

export function createEventId() {
  return String(eventGuid++)
}

export function cleanData(timeSlots) {
  let availabilty = timeSlots.map((slot) => {
     return {
        start: slot.start.toISOString(),
        end: slot.end.toISOString()
      }
  })

  return availabilty;
}