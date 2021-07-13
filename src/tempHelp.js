// for each respondant
// convert to unix
// check which start times they can make and save it

// make an object that stores all possible start times
/*
  {

  }
*/
let helpers = {};
helpers.CheckAvail = (window, rsvps, eventLength) => {
  // find the avilable windows
  const lengthInMS = length * 60 * 60 * 1000;
  let startTimes = helpers.allTimes(window, eventLength)
  //debugger
  rsvps.forEach( rsvp => {
    rsvp.availability.forEach( block => {
      let start = Date.parse(block.start);
      let end = Date.parse(block.end);
      while(start < end) {
        if (start + lengthInMS < end) {
            console.log(start)
            if (startTimes[start] === undefined) {
                start += lengthInMS;
                continue;
            }
          startTimes[start].push(rsvp.name)
        }
        start += lengthInMS
      }
    })
  })
  // filter out times with no availability
  for (var k in startTimes) {
      if (startTimes[k].length === 0) {
          delete startTimes[k]
      }
  }
  return startTimes
}
helpers.allTimes = (window, length) => {
  let obj = {}
  let first = Date.parse(window.start)
  let end = Date.parse(window.end)
  while (first < end) {
    obj[first] = []
    first += length * 60 * 60 * 1000
  }
  return obj;
}