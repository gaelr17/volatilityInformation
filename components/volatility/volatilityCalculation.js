const axios = require('axios');

const { ROOT_URL } = require('../../constants');

function calculateVolatility(t) {
  const n = t.length;
  const sum = t.reduce((acc, cur) => acc + cur);
  const mean = sum / n;
  const a = t.map((x) => Math.pow(x - mean, 2));

  return Math.sqrt(a.reduce((acc, cur) => acc + cur) / n);
}

module.exports.currentVolatility = function() {
  const request = axios.get(`${ROOT_URL}/stockData`)
    .then(function(payload) {
      return {
        timestamp: payload.data[payload.data.length - 1].timestamp,
        value: calculateVolatility(payload.data.map((x) => parseFloat(x.bid)))
      };
    })
    .catch((error) => {
      console.log('Error in function volatility :');
      console.log(error.response)
    })

  return request;
}
