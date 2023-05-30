import { useEffect, useState } from "react";
import Plot from 'react-plotly.js';

export function StockItem({ completed, id, title, toggleStock, deleteStock }) {
  const [showChart, setShowChart] = useState(false);
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);
  const symbol = title; // Set symbol variable equal to the title

  useEffect(() => {
    fetchStock();
  }, []);

  function fetchStock() {
    const API_KEY = "UMQO1CLDVQKAFLQH";
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&outputsize=compact&apikey=${API_KEY}&symbol=${symbol}`;

    let stockChart_X = [];
    let stockChart_Y = [];

    fetch(API_Call)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        for (var key in data['Time Series (Daily)']) {
          stockChart_X.push(key);
          stockChart_Y.push(data['Time Series (Daily)'][key]['1. open']);
        }

        setStockChartXValues(stockChart_X);
        setStockChartYValues(stockChart_Y);
      });
  }

  return (
    <div className="stock-item">
      <div className="stock-details">
        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => toggleStock(id, e.target.checked)}
          />
          <span className="stock-title">{title}</span>
        </label>
      </div>
      {showChart && stockChartXValues.length > 0 && (
        <div className="stock-chart">
          <Plot
            data={[
              {
                x: stockChartXValues,
                y: stockChartYValues,
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "red" },
              },
            ]}
            layout={{
              width: 840,
              height: 440,
              title: symbol,
            }}
          />
        </div>
      )}
      <div className="stock-actions">
        <button onClick={() => deleteStock(id)} className="btn btn-danger">
          Delete
        </button>
        <button onClick={() => setShowChart(!showChart)} className="btn btn-show">
          {showChart ? "Hide Graph" : "Show Graph"}
        </button>
      </div>
    </div>
  );
}
