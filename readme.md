This is a Websocket server using NodeJS.
It fetches stock data every 10 seconds via a REST API and stores it in a mongo DB.
It also calculates the volatility from this data, and sends it to every connected
client through the Websocket flow.

Requirements : NodeJS and Mongo installed.
Start your mongo service, and then type "npm start" to launch the server.

This is a local server, though you can simulate several clients connecting by
opening several windows.

If you stop it and restart it later, you might want to erase all data upon
starting so that you don't miss data from several days which would influence
the resulting volatility. Via Postman for instance, in delete mode :
_ http://localhost:3000/volatility
_ http://localhost:3000/stockData
