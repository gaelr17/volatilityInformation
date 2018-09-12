This is a Websocket server using NodeJS.
It fetches stock data every 10 seconds via a REST API and stores it in a mongo DB.
It also calculates the volatility from this data, and sends it to every client
through the Websocket flow.

Requirements : NodeJS and Mongo installed.

This is a local server, though you can simulate several clients connecting by
opening several windows.
