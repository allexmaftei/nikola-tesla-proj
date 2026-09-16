# Atlas Trader

An interactive paper-trading terminal prototype with a live-style market pulse, portfolio workspace, order simulation, price alerts, and an Atlas Labs linear-regression forecast trained with gradient descent in the browser.

## ✨ New Features

- **Price Alerts**: Set custom price targets and get notified when prices hit your levels
- **Enhanced Portfolio**: Close positions directly from the positions table
- **Activity Feed**: Real-time order tracking with timestamps
- **Alerts Dashboard**: Dedicated view to manage all your price alerts
- **Interactive Models**: Train ML models with real-time parameter adjustment
- **Win Rate Tracking**: Monitor your paper trading performance metrics
- **Risk Scoring**: Automatic portfolio risk assessment

## 🚀 Run locally

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Quick Start

```bash
# Clone the repository
git clone https://github.com/allexmaftei/nikola-tesla-proj.git
cd nikola-tesla-proj

# Install dependencies
npm install

# Start the development server
npm run dev
```

The terminal will display a local URL (typically **http://localhost:5173**). Open this URL in your browser to see the interactive demo.

## 📋 What is included

- **Responsive trading dashboard** with watchlist chart and portfolio metrics
- **Simulated paper orders** that update the positions table without sending a real order
- **Price alert system** with custom triggers and notification channels
- **Interactive position management** - close trades directly from the table
- **Browser-side batch gradient descent** for a linear regression signal forecast
- **Streaming seeded market values** to exercise the live dashboard interaction
- **Multiple views**: Overview, Markets, Portfolio, Alerts, and Models & Learn
- **Real-time chart updates** with multiple time ranges (1D, 1W, 1M, 3M, 1Y)
- **Dark/Light theme toggle** with localStorage persistence

## 🎯 Key Interactive Elements

### Trade Modal
Click "+ New paper trade" to:
- Enter stock symbol (NVDA, AAPL, TSLA, MSFT, AMD)
- Set number of shares
- Choose Buy or Sell
- See estimated value in real-time
- Submit paper orders

### Price Alerts
Click "🔔 Set Alert" or go to Alerts tab to:
- Set price targets for any stock
- Choose alert type (above, below, or % change)
- Select notification method (Email, Popup, or Both)
- View all active alerts
- Delete alerts you no longer need

### Model Lab
Navigate to Models & Learn to:
- Adjust momentum, volume, and volatility sliders
- Watch real-time predictions update
- Train the model with gradient descent
- Learn about ML concepts with guided lessons

### Portfolio Management
- View all open positions with real-time P&L
- Close positions with one click
- See day returns and average cost basis
- Track performance metrics

## 📊 Live Market Data

The dashboard updates market prices every 3.5 seconds with simulated realistic movements:
- NVDA (±1.55 points per update)
- AAPL (±0.92 points per update)
- TSLA (±1.2 points per update)
- MSFT (±0.8 points per update)
- SPY (±0.65 points per update)

## 🛠 Production data path

The current build deliberately uses seeded data so it runs without credentials. For real market data, add a server-side adapter for a licensed provider such as:
- [Polygon.io](https://polygon.io)
- [Finnhub](https://finnhub.io)
- [Alpaca](https://alpaca.markets)
- [IEX Cloud](https://iexcloud.io)

## 🎨 Customization

- **Theme**: Toggle between light and dark modes (preference saved to localStorage)
- **Chart Ranges**: Switch between 1D, 1W, 1M, 3M, 1Y views
- **Alerts**: Create unlimited price alerts with custom triggers
- **Model Parameters**: Adjust ML model inputs in real-time

## 📝 Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Charts**: Canvas API for custom chart rendering
- **Build Tool**: Vite
- **Styling**: Custom CSS with CSS variables for theming
- **State Management**: localStorage for persistence

## 🧠 Machine Learning Features

The model lab implements real gradient descent optimization:
- Linear regression with 2 features (momentum, volume, volatility)
- 850 epochs of training per run
- Configurable learning rate (0.08)
- Real-time loss visualization
- Training loss tracking

## 💡 Paper Trading Simulator

Features:
- Simulated buy/sell orders
- Real-time position tracking
- P&L calculation with average cost basis
- Order history and activity feed
- Win rate and risk scoring
- Day returns monitoring

## 🔔 Notification System

Integrated alert system with:
- Price-level triggers (above/below targets)
- Multiple notification methods
- Real-time checking every 3.5 seconds
- Alert management dashboard
- Notification badges

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Feel free to fork, submit issues, and create pull requests!

## 📄 License

MIT License - See LICENSE file for details

---

**Note**: This is a paper trading simulator for educational purposes. Do not use real money or actual trading credentials without proper security implementation.
