const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  for (const obj of passTimes) {
    const newDate = new Date(obj.risetime * 1000);

    //get weekday
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weekday = days[newDate.getDay() - 1];
    
    //get month name
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const month = months[newDate.getMonth()];

    //the .toLocaleString method forces numbers to show 2 digits/appends 0
    const day = newDate.getDate().toLocaleString('en-us', {minimumIntegerDigits: 2});

    const year = newDate.getFullYear();
    const hour = newDate.getHours().toLocaleString('en-us', {minimumIntegerDigits: 2});
    const min = newDate.getMinutes().toLocaleString('en-us', {minimumIntegerDigits: 2});
    const sec = newDate.getSeconds().toLocaleString('en-us', {minimumIntegerDigits: 2});

    const time = `${weekday} ${month} ${day} ${year} ${hour}:${min}:${sec}`;

    console.log(`Next passt at ${time} UTC for ${obj.duration} seconds!`);
    
  }
});