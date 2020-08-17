const geocode = require('./geocode');
const forecast = require('./forecast');

const combine = (address, req, res) => {
  geocode(address, (error, geocodeData) => {
    if (error) {
      res.send({
        error: error
      });
    } else {
      const { lat, lon, location } = geocodeData;
      // console.log('geocodeData', geocodeData)
      forecast(lat, lon, (error, forecastData) => {
        if (error) {
          res.send({
            error: error
          });
        } else {
          const { forecast, temp, feelslike, humidity, pressure } = forecastData;
          // console.log('forecastData', forecastData)
          return res.send({
            forecast,
            location,
            address,
            temp,
            feelslike,
            humidity,
            pressure
          });
        }
      });
    }
  });
};

module.exports = combine;
