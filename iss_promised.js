const request = require('request-promise-native');
const ipURL = `https://api.ipify.org?format=json`;
const locUrl = `https://ipvigilante.com/json/`;



const fetchMyIP = function() {
  return request(ipURL);
};


const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${ip}`);
}


const fetchISSFlyOvertimes = function(body) {
  const {latitude, longitude} = JSON.parse(body).data;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
}

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOvertimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response
    });
  }

module.exports = { nextISSTimesForMyLocation };