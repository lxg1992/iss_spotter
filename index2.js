const { nextISSTimesForMyLocation } = require('./iss_promised');



nextISSTimesForMyLocation().then((passTimes => {
  passTimes.forEach((time) => {
    dt = new Date(0);
    dt.setUTCSeconds(time.risetime);
    dur = time.duration;
    console.log(`Next pass at ${dt} for ${dur} seconds!`);
  })
})).catch((error) => {
  console.log("Didn't work!: ", error.message);
});



