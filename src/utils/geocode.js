const request = require('request');

const geocode = (address, callback) => {
  const mapboxURL = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibGFzbmkiLCJhIjoiY2tkb2pkYnAyMXQzODJxbGN4MThyc3VvNSJ9.jBxGNhY57pErarY0jPAbHQ&limit=1`;

  request(
    {
      url: mapboxURL,
      json: true
    },
    (error, response) => {
      if (error) {
        callback('Unable to connect to location services', undefined);
      } else if (!response.body.features[0]) {
        callback('Unable to find location. Try another search', undefined);
      } else {
        const data = response.body;
        const location = data.features[0].place_name;
        const [ lon, lat ] = data.features[0].center;
        callback(undefined, { location, lat, lon });
      }
    }
  );
};

module.exports = geocode;
