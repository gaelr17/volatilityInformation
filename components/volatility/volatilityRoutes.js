const volatility = require('./volatilityController');

module.exports = function(app) {

  app.route('/volatility')
    .get(volatility.listAllVolatilities)
    .post(volatility.addNewVolatilityToDB)
    .delete(volatility.deleteAllVolatilities);

  app.route('/newestVolatility')
    .get(volatility.newestVolatility);

};
