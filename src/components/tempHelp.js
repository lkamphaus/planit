
let helpers = {};
helpers.CheckAvail = (window, rsvps, eventLength) => {
  const lengthInMS = eventLength * 60 * 60 * 1000;
  let rsvpNum = rsvps.length;
  let startTimes = helpers.allTimes(window, eventLength)
  rsvps.forEach( rsvp => {
    rsvp.availability.forEach( block => {
      let start = Date.parse(block.start);
      let end = Date.parse(block.end);
      while(start < end) {
        if (start + lengthInMS < end) {
            if (startTimes[start] === undefined) {
                start += 0.5 * 60 * 60 * 1000;
                continue;
            }
          startTimes[start].push(rsvp.name)
        }

        start += 0.5 * 60 * 60 * 1000
      }
    })
  })
  // filter out times with no availability
  let results = {}
  for (var k in startTimes) {
    let attendees = startTimes[k].length;
      if (attendees > 0) {
          if (results[attendees] === undefined) {
            results[attendees] = [k]
          } else {
            results[attendees].push(k)
          }
      }
  }
  return results
}
helpers.allTimes = (window, length) => {
  let obj = {}
  let first = Date.parse(window.start)
  let end = Date.parse(window.end)
  while (first < end) {
    obj[first] = []
    first += .5 * 60 * 60 * 1000
  }
  return obj;
}
helpers.listRSVPs = (rsvps, emOrName) => {
  let list = []
  rsvps.forEach( rsvp => {
    list.push(rsvp[emOrName])
  })
  return list
}

export default helpers;