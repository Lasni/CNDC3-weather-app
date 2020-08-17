const request = require('request');

const forecast = (lat, lon, callback) => {
  const weatherstackURL = `http://api.weatherstack.com/current?access_key=004e63f5239116c8691db9005619550b&query=${lat},${lon}`;

  request(
    {
      url: weatherstackURL,
      json: true
    },
    (error, response) => {
      if (error) {
        callback('Error. Unable to connect.', undefined);
      } else if (response.body.error) {
        callback('Error. Unable to find the location', undefined);
      } else {
        const data = response.body;
        // console.log('data', data)
        const temp = data.current.temperature;
        const feelslike = data.current.feelslike;
        const forecast = data.current.weather_descriptions[0];
        const humidity = data.current.humidity
        const pressure = data.current.pressure
        callback(undefined, { forecast, temp, feelslike, humidity, pressure });
      }
    }
  );
};

module.exports = forecast;
