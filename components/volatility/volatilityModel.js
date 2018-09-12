const mongoose = require('mongoose');
const { Schema } = mongoose;

const volatilitySchema = new Schema({
  timestamp: {
    type: Date
  },
  value: {
    type: Number
  }
});

module.exports = mongoose.model('Volatility', volatilitySchema);
