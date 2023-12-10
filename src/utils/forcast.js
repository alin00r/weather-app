const request = require("request");

const forcast = (address, callback) => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    address +
    "&appid=" +
    process.env.APPID +
    "&units=metric";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.message) {
      callback("Unable to find location,Try another  search.", undefined);
    } else {
      callback(undefined, {
        Forcast: `${body.weather[0].description}, It is Currently ${body.main.temp} degress outside, This High today is ${body.main.temp_max} with a low of ${body.main.temp_min}.`,
        address: `${body.name},${body.sys.country}`,
      });
    }
  });
};

module.exports = forcast;
