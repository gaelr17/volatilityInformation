const axios = require('axios');
const mongoose = require('mongoose');
const StockData = mongoose.model('StockData');

const {ROOT_URL, REST_URL} = require('../../constants');

module.exports.addStockDataAndNewVolatility = function() {
  axios.post(`${ROOT_URL}/stockData`).then(() => {
      axios.post(`${ROOT_URL}/volatility`)
    })
    .catch((error) => {
      console.log('Error in function addStockDataAndUpdateVolatility :');
      console.log(error.response)
    });
}

module.exports.addStockDataToDb = function(req, res) {
  axios.get(`${REST_URL}`).then(function(payload) {
    const newStockData = new StockData(payload.data);
    newStockData.save(function(err, stockData) {
      if (err) {
        res.send(err);
      }
      res.json(stockData);
    });
  })
};

module.exports.listAllStockData = function(req, res) {
  StockData.find({}, function(err, stockData) {
    if (err) {
      res.send(err);
    }
    res.json(stockData);
  });
};

module.exports.deleteAllStockData = function(req, res) {
  StockData.remove({}, function(err, stockData) {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Every stockData successfully deleted' });
  });
};
