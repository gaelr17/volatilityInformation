const axios = require('axios');
const mongoose = require('mongoose');
const Volatility = mongoose.model('Volatility');

const { ROOT_URL } = require('../../constants');

function calculateVolatility(t) {
  const n = t.length;
  const sum = t.reduce((acc, cur) => acc + cur);
  const mean = sum / n;
  const a = t.map((x) => Math.pow(x - mean, 2));

  return Math.sqrt(a.reduce((acc, cur) => acc + cur) / n);
}

function currentVolatility() {
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

module.exports.newestVolatility = function(req, res) {
  Volatility.findOne()
    .sort({ field: 'asc', _id: -1 })
    .limit(1)
    .exec(function(err, volat) {
      if (err) {
        res.send(err);
      }
      res.json(volat);
    });
}

module.exports.getNewestVolatility = function() {
  const request = axios.get(`${ROOT_URL}/newestVolatility`)
    .catch((error) => {
      console.log('Error in function lastRegisteredVolatility :');
      console.log(error.response);
    });

    return request;
}

module.exports.addNewVolatilityToDB = function(req, res) {
  currentVolatility().then(function(v) {
    const newVolatility = new Volatility(v);
    newVolatility.save(function(err, volat) {
      if (err) {
        res.send(err);
      }
      res.json(volat);
    })
  })
};

module.exports.listAllVolatilities = function(req, res) {
  Volatility.find({}, function(err, volat) {
    if (err) {
      res.send(err);
    }
    res.json(volat);
  });
};

module.exports.deleteAllVolatilities = function(req, res) {
  Volatility.remove({}, function(err, volat) {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Every volatility successfully deleted' });
  });
};
