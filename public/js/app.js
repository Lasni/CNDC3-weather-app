const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message1');
const messageTwo = document.querySelector('#message2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        const a = `Forecast for ${data.location}`;
        const b = `It's ${data.forecast} with ${data.temp}dgrC, feeling like ${data.feelslike}dgrC.\nHumidity: ${data.humidity}% / Pressure: ${data.pressure}hPa`;
        messageOne.textContent = a;
        messageTwo.textContent = b;
      }
    });
  });
});
