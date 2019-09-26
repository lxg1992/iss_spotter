const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((err, ip) => {
//   if (err) {
//     console.log("Didn't work! ", err);
//     return;
//   }

//   console.log("IP IS: ", ip);
// });

fetchCoordsByIP('66.207.199.230', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

fetchISSFlyOverTimes({ latitude: '43.63830', longitude: '-79.43010' }, (err, data) => {
  if(err) {
    console.log(err);
  } else {
    console.log(data);
  }
})
