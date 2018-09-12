const stockData = require('./stockDataController');

module.exports = function(app) {

  app.route('/stockData')
    .get(stockData.listAllStockData)
    .post(stockData.addStockDataToDb)
    .delete(stockData.deleteAllStockData);

};
