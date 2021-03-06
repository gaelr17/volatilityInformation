const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const StockData = require('./components/stockData/stockDataModel');
const stockData = require('./components/stockData/stockDataController');
const stockDataRoutes = require('./components/stockData/stockDataRoutes');
const Volatility = require('./components/volatility/volatilityModel');
const volatility = require('./components/volatility/volatilityController');
const volatilityRoutes = require('./components/volatility/volatilityRoutes');

const { PORT, INTERVAL_MS } = require('./constants');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/volatilityDB', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html')
})

volatilityRoutes(app);
stockDataRoutes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

setInterval(
  function() {
    stockData.addStockDataAndNewVolatility();
    volatility.getNewestVolatility()
      .then((resp) => io.sockets.emit('volatility', resp.data))
  }, INTERVAL_MS

)

io.sockets.on('connection', function(socket) {
  volatility.getNewestVolatility()
    .then((resp) => socket.emit('volatility', resp.data));
})

server.listen(PORT);

console.log('Server started on port: ' + PORT);
