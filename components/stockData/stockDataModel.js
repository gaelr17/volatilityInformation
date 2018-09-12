const mongoose = require('mongoose');
const { Schema } = mongoose;

const stockDataSchema = new Schema({
  ask: {
    type: String
  },
  bid: {
    type: String
  },
  high: {
    type: String
  },
  last: {
    type: String
  },
  low: {
    type: String
  },
  open: {
    type: Number
  },
  timestamp: {
    type: Date
  },
  volume: {
    type: String
  },
  vwap: {
    type: String
  }
});

module.exports = mongoose.model('StockData', stockDataSchema);
