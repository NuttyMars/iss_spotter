const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org/?format=json', (error, response, body) => {
  
    if (error) {

      //if an error occurs, pass the error to the callback
      //the callback will print it along with "It didn't work!"
      callback(error, null);
      return;
    }
  
    //if there's no error but something goes wrong
    if (response.statusCode !== 200) {
    
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
    
      //create a new Error object
      //pass the specific error to the callback
      callback(Error(msg), null);
      return;
    }
  
    //API gives a JSON format, needs parsing
    //we then extract the value of the ip key
    const IP = JSON.parse(body).ip;
  
    //pass it to the callback
    //first parameter is null because there is no error
    callback(null, IP);
  
  });
};

/**
 * Makes a single API request to retrieve the user's GPS coordinates based on IP address.
 * Input:
 *   - IP (obtained previously)
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - An object with lat/long coordinates. Example: "{lat: 12.345, lon: 67.890}"
 */

const fetchCoordsByIP = function(ip, callback) {

  request(`http://ip-api.com/json/${ip}?fields=192`, (error, response, body) => {

    if (error) {

      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {

      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const coords = JSON.parse(body);
    callback(null, coords);
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {

  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.lat}&lon=${coords.lon}`, (error, response, body) => {

    if (error) {

      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {

      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const flyoverData = JSON.parse(body);
    callback(null, flyoverData.response);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };

//IP: '184.162.209.71'