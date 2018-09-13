const axios = require('axios');
const mongoose = require('mongoose');
const { currentVolatility } = require('./volatilityCalculation');
const Volatility = mongoose.model('Volatility');

const { ROOT_URL } = require('../../constants');

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
