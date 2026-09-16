# Atlas Trader

An interactive paper-trading terminal prototype with a live-style market pulse, portfolio workspace, order simulation, and an Atlas Labs linear-regression forecast trained with gradient descent in the browser.

## Run locally

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## What is included

- Responsive trading dashboard with watchlist chart and portfolio metrics.
- Simulated paper orders that update the positions table without sending a real order.
- Browser-side batch gradient descent for a linear regression signal forecast.
- Streaming seeded market values to exercise the live dashboard interaction.

## Production data path

The current build deliberately uses seeded data so it runs without credentials. For real market data, add a server-side adapter for a licensed provider such as Polygon, Finnhub, Alpaca, or Interactive Brokers, then stream normalized quote events to the UI over WebSocket or Server-Sent Events. Keep provider keys and broker order endpoints on the server; never place them in `app.js` or other browser-delivered files.