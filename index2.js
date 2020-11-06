const { nextISSTimesForMyLocation } = require('./iss_promised');

// const printPassTimes = function(passTimes) {
//   for (const pass of passTimes) {
//     const datetime = new Date(0);
//     datetime.setUTCSeconds(pass.risetime);
//     const duration = pass.duration;
//     console.log(`Next pass at ${datetime} for ${duration} seconds!`);
//   }
// };

return nextISSTimesForMyLocation()
  .then((flyovers) => {
  console.log('flyovers :', flyovers);

    // for (const pass of flyovers) {

    //   const datetime = new Date(0);
    //   datetime.setUTCSeconds(pass.risetime);
    //   const duration = pass.duration;
    //   console.log(`Next pass at ${datetime} for ${duration} seconds!`);
    // }
  })
  // .catch((error) => {
  //   console.log("It didn't work: ", error.message);
  // });


  