const chart = document.querySelector('#marketChart');
const chartContext = chart.getContext('2d');
const tradeModal = document.querySelector('#tradeModal');
const tradeSymbol = document.querySelector('#tradeSymbol');
const tradeShares = document.querySelector('#tradeShares');
const estimatedValue = document.querySelector('#estimatedValue');
const tradeFeedback = document.querySelector('#tradeFeedback');
const positionsBody = document.querySelector('#positionsBody');

const prices = { NVDA: 184.92, TSLA: 248.09, AAPL: 247.12, MSFT: 514.33, AMD: 154.72 };
let selectedSide = 'buy';
let selectedRange = '1W';
let chartSeries = buildSeries(42);
const overviewView = document.querySelector('#overview');
const modelsView = document.querySelector('#models-page');
const themeButtons = document.querySelectorAll('.theme-toggle');

function applyTheme(theme) {
  const dark = theme === 'dark';
  document.body.classList.toggle('dark-theme', dark);
  themeButtons.forEach((button) => {
    button.textContent = dark ? '☀' : '☾';
    button.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  });
}

function buildSeries(points) {
  const series = { nvda: [], aapl: [], spy: [] };
  let nvda = 0;
  let aapl = 0;
  let spy = 0;
  for (let index = 0; index < points; index += 1) {
    nvda += (Math.random() - 0.42) * 1.55;
    aapl += (Math.random() - 0.47) * 0.92;
    spy += (Math.random() - 0.49) * 0.65;
    series.nvda.push(nvda);
    series.aapl.push(aapl);
    series.spy.push(spy);
  }
  return series;
}

function resizeCanvas() {
  const scale = window.devicePixelRatio || 1;
  const bounds = chart.getBoundingClientRect();
  chart.width = bounds.width * scale;
  chart.height = bounds.height * scale;
  chartContext.setTransform(scale, 0, 0, scale, 0, 0);
  drawChart();
}

function drawChart() {
  const width = chart.clientWidth;
  const height = chart.clientHeight;
  chartContext.clearRect(0, 0, width, height);
  const padding = { top: 9, right: 3, bottom: 10, left: 3 };
  const values = [...chartSeries.nvda, ...chartSeries.aapl, ...chartSeries.spy];
  const minimum = Math.min(...values) - 2;
  const maximum = Math.max(...values) + 2;
  const xStep = (width - padding.left - padding.right) / (chartSeries.nvda.length - 1);
  const yPosition = (value) => height - padding.bottom - ((value - minimum) / (maximum - minimum)) * (height - padding.top - padding.bottom);
  [0.08, 0.32, 0.56, 0.8, 1].forEach((fraction) => {
    const y = padding.top + fraction * (height - padding.top - padding.bottom);
    chartContext.beginPath();
    chartContext.moveTo(0, y);
    chartContext.lineTo(width, y);
    chartContext.strokeStyle = '#edf1ed';
    chartContext.lineWidth = 1;
    chartContext.stroke();
  });
  drawLine(chartSeries.spy, '#b4beb7', 1.25, xStep, yPosition);
  drawLine(chartSeries.aapl, '#5d84df', 1.5, xStep, yPosition);
  drawLine(chartSeries.nvda, '#ec844e', 2.2, xStep, yPosition, true);
}

function drawLine(series, color, lineWidth, xStep, yPosition, highlight = false) {
  chartContext.beginPath();
  series.forEach((value, index) => {
    const x = index * xStep;
    const y = yPosition(value);
    if (index === 0) chartContext.moveTo(x, y);
    else chartContext.lineTo(x, y);
  });
  chartContext.strokeStyle = color;
  chartContext.lineWidth = lineWidth;
  chartContext.lineJoin = 'round';
  chartContext.lineCap = 'round';
  chartContext.stroke();
  if (highlight) {
    const x = (series.length - 1) * xStep;
    const y = yPosition(series[series.length - 1]);
    chartContext.beginPath();
    chartContext.arc(x, y, 4, 0, Math.PI * 2);
    chartContext.fillStyle = '#fff';
    chartContext.fill();
    chartContext.beginPath();
    chartContext.arc(x, y, 2.5, 0, Math.PI * 2);
    chartContext.fillStyle = color;
    chartContext.fill();
  }
}

function updateChartRange(range) {
  selectedRange = range;
  const sizes = { '1D': 24, '1W': 42, '1M': 54, '3M': 66, '1Y': 78 };
  chartSeries = buildSeries(sizes[range]);
  document.querySelectorAll('.time-tab').forEach((tab) => tab.classList.toggle('active', tab.dataset.range === range));
  document.querySelector('#nvdaLegend').textContent = `+${(6.2 + Math.random() * 3).toFixed(2)}%`;
  resizeCanvas();
}

function openTradeModal() {
  tradeModal.hidden = false;
  tradeFeedback.textContent = '';
  tradeSymbol.focus();
}

function closeTradeModal() {
  tradeModal.hidden = true;
}

function refreshEstimate() {
  const symbol = tradeSymbol.value.trim().toUpperCase();
  const shares = Math.max(0, Number(tradeShares.value) || 0);
  const price = prices[symbol] || prices.NVDA;
  estimatedValue.textContent = `$${(price * shares).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function addTradeToFeed(symbol, shares, side) {
  const row = document.createElement('tr');
  const logoClass = symbol === 'TSLA' ? 'tesla' : symbol === 'AAPL' ? 'apple' : symbol === 'MSFT' ? 'microsoft' : 'nvidia';
  const price = prices[symbol] || prices.NVDA;
  row.innerHTML = `<td><span class="stock-logo ${logoClass}">${symbol[0]}</span><span class="asset-name"><strong>${symbol}</strong><small>${side === 'buy' ? 'Paper position' : 'Paper exit'}</small></span></td><td class="mono">$${price.toFixed(2)}</td><td class="mono">${shares}</td><td class="mono">$${price.toFixed(2)}</td><td class="mono">$${(price * shares).toFixed(2)}</td><td class="${side === 'buy' ? 'positive' : ''} mono">${side === 'buy' ? '+' : '-'}$0.00 <small>0.00%</small></td><td><button class="row-menu">•••</button></td>`;
  positionsBody.prepend(row);
}

function runGradientDescent() {
  const x = Array.from({ length: 90 }, (_, index) => index / 89);
  const y = x.map((value) => 0.15 + value * 0.68 + (Math.sin(value * 19) * 0.05) + (Math.random() - 0.5) * 0.035);
  let weight = 0.1;
  let bias = 0.1;
  const learningRate = 0.08;
  let loss = 0;
  for (let epoch = 0; epoch < 850; epoch += 1) {
    let weightGradient = 0;
    let biasGradient = 0;
    loss = 0;
    x.forEach((feature, index) => {
      const error = weight * feature + bias - y[index];
      loss += error ** 2;
      weightGradient += error * feature;
      biasGradient += error;
    });
    weight -= learningRate * (2 / x.length) * weightGradient;
    bias -= learningRate * (2 / x.length) * biasGradient;
    loss /= x.length;
  }
  document.querySelector('#lossValue').textContent = loss.toFixed(4);
  document.querySelector('#trainedAt').textContent = 'just now';
  const forecast = 5.9 + weight * 1.1 + Math.random() * 1.4;
  document.querySelector('.forecast-number').innerHTML = `+${forecast.toFixed(1)}% <span>bullish</span>`;
  document.querySelector('.metric-card:last-child .metric-value').innerHTML = `${(74 + Math.random() * 6).toFixed(1)}<span class="metric-cents">%</span>`;
  document.querySelector('#trainButton').innerHTML = '<span class="spark">✦</span> Model retrained <kbd>⌘ ↵</kbd>';
  setTimeout(() => { document.querySelector('#trainButton').innerHTML = '<span class="spark">✦</span> Retrain model <kbd>⌘ ↵</kbd>'; }, 1800);
}

function showView(viewName) {
  const showModels = viewName === 'models-page';
  overviewView.hidden = showModels;
  modelsView.hidden = !showModels;
  document.querySelectorAll('.nav-item').forEach((item) => item.classList.toggle('active', item.getAttribute('href') === `#${showModels ? 'models-page' : 'overview'}`));
  if (showModels) window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateLabPrediction() {
  const momentum = Number(document.querySelector('#momentumInput').value);
  const volume = Number(document.querySelector('#volumeInput').value);
  const volatility = Number(document.querySelector('#volatilityInput').value);
  const prediction = (momentum * 0.07) + (volume * 0.025) - (volatility * 0.035) - 1.2;
  document.querySelector('#momentumValue').textContent = momentum;
  document.querySelector('#volumeValue').textContent = volume;
  document.querySelector('#volatilityValue').textContent = volatility;
  document.querySelector('#labPrediction').textContent = `${prediction >= 0 ? '+' : ''}${prediction.toFixed(1)}%`;
  document.querySelector('#labSignal').textContent = prediction > 2 ? 'Bullish' : prediction < -2 ? 'Cautious' : 'Neutral';
  document.querySelector('#labSignal').classList.toggle('positive', prediction > 2);
}

function trainLabModel() {
  const status = document.querySelector('#trainingStatus');
  const button = document.querySelector('#labTrainButton');
  status.innerHTML = '<span class="status-dot"></span> Training in progress <small>Running gradient descent...</small>';
  button.disabled = true;
  setTimeout(() => {
    runGradientDescent();
    updateLabPrediction();
    status.innerHTML = '<span class="status-dot"></span> Model updated <small>Just now · 850 epochs completed</small>';
    button.disabled = false;
  }, 500);
}

function showLesson(lesson) {
  const copy = {
    market: 'Compare a stock with its benchmark. A rising price with rising volume can confirm momentum, while a rising price on weak volume deserves a closer look.',
    risk: 'Use a validation set and compare your forecast with a simple baseline. A complex model is only useful when it generalizes to data it has never seen.',
    hypothesis: 'Write: “If momentum stays above 60 and volatility stays below 40, then NVDA will outperform SPY over the next 7 trading days.” Then paper trade and review the result.'
  };
  document.querySelector('#lessonText').textContent = copy[lesson];
  document.querySelector('#lessonBanner').hidden = false;
}

document.querySelector('#tradeButton').addEventListener('click', openTradeModal);
document.querySelector('#closeModal').addEventListener('click', closeTradeModal);
tradeModal.addEventListener('click', (event) => { if (event.target === tradeModal) closeTradeModal(); });
tradeSymbol.addEventListener('input', refreshEstimate);
tradeShares.addEventListener('input', refreshEstimate);
document.querySelectorAll('.trade-tab').forEach((tab) => tab.addEventListener('click', () => {
  selectedSide = tab.dataset.side;
  document.querySelectorAll('.trade-tab').forEach((item) => item.classList.toggle('active', item === tab));
}));
document.querySelector('#submitTrade').addEventListener('click', () => {
  const symbol = tradeSymbol.value.trim().toUpperCase() || 'NVDA';
  const shares = Math.max(1, Number(tradeShares.value) || 1);
  prices[symbol] ||= 184.92;
  addTradeToFeed(symbol, shares, selectedSide);
  tradeFeedback.textContent = `${selectedSide === 'buy' ? 'Buy' : 'Sell'} order queued in paper account.`;
  setTimeout(closeTradeModal, 1000);
});
document.querySelector('#trainButton').addEventListener('click', runGradientDescent);
document.querySelectorAll('.time-tab').forEach((tab) => tab.addEventListener('click', () => updateChartRange(tab.dataset.range)));
document.querySelectorAll('.feature-controls input').forEach((input) => input.addEventListener('input', updateLabPrediction));
document.querySelector('#labTrainButton').addEventListener('click', trainLabModel);
document.querySelectorAll('.lesson-button').forEach((button) => button.addEventListener('click', () => showLesson(button.dataset.lesson)));
document.querySelector('#closeLesson').addEventListener('click', () => { document.querySelector('#lessonBanner').hidden = true; });
themeButtons.forEach((button) => button.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
  localStorage.setItem('atlas-theme', nextTheme);
  applyTheme(nextTheme);
}));
window.addEventListener('hashchange', () => showView(window.location.hash.slice(1)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeTradeModal();
  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') runGradientDescent();
});
window.addEventListener('resize', resizeCanvas);
applyTheme(localStorage.getItem('atlas-theme') || 'light');
showView(window.location.hash.slice(1) || 'overview');
resizeCanvas();
setInterval(() => {
  prices.NVDA += (Math.random() - 0.49) * 0.14;
  const currentPrice = document.querySelector('.forecast-price');
  currentPrice.innerHTML = `$${prices.NVDA.toFixed(2)} <em>+3.21%</em>`;
  chartSeries.nvda.push(chartSeries.nvda.at(-1) + (Math.random() - 0.42) * 0.35);
  chartSeries.aapl.push(chartSeries.aapl.at(-1) + (Math.random() - 0.47) * 0.2);
  chartSeries.spy.push(chartSeries.spy.at(-1) + (Math.random() - 0.49) * 0.13);
  chartSeries.nvda.shift(); chartSeries.aapl.shift(); chartSeries.spy.shift();
  drawChart();
}, 3500);
