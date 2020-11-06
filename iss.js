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

module.exports = { fetchMyIP, fetchCoordsByIP };

//IP: '184.162.209.71'