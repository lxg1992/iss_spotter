const request = require('request');
const ipURL = `https://api.ipify.org?format=json`;
//const hardIP = `66.207.199.230`;
const locURL = `https://ipvigilante.com/json/`;
//const flyURL = `http://api.open-notify.org/iss-pass.json?`; //lat=LAT&lon=LON

const fetchMyIP = function(callback) {
  request(ipURL, (err,response,body) => {
    if (err) {
      callback(err, null);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg),null);
    } else {
      callback(null, JSON.parse(body).ip);
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(locURL + ip, (err, res, body) => {
    if (err) {
      callback(err, null);
    } else if (res.statusCode === 400) {
      callback(Error(`Bad request. Status code 400. ${ip} is not a valid IP`), null);
    } else if (res.statusCode !== 200) {
      callback(Error(`Status: ${res.statusCode}, when fetching location. Response ${body}`), null);
    } else {
      let retObj = JSON.parse(body);
      callback(null, {latitude: retObj.data.latitude, longitude: retObj.data.longitude});
    }
  });
};

const fetchISSFlyOverTimes = function(latlong, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${latlong.latitude}&lon=${latlong.longitude}`, (err,res,body) => {
    if (err) {
      callback(err, null);
    } else if (res.statusCode !== 200) {
      callback(Error(`${res.statusCode} - error. Response: ${body}`), null);
    } else {
      callback(null, JSON.parse(body).response);
    }
  });
};



const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, latlong) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(latlong, (error, nextPasses) => {
        if (error) {
          return callback(error,null);
        }

        callback(null,nextPasses);
      });


    });
  });
};

module.exports = { nextISSTimesForMyLocation };