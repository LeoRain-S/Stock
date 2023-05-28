import { useEffect, useState } from "react"
import { NewStockForm } from "./NewStockForm"
import "./style.css"
import { StockList } from "./StockList"
import { StockChart } from "./StockChart"
import Plot from 'react-plotly.js';

export default function App() {
  const [stocks, setStocks] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(stocks))
  }, [stocks])

  function addStock(title) {
    setStocks(currentStocks => {
      return [
        ...currentStocks,
        { id: crypto.randomUUID(), title, completed: false },
      ]
    })
  }

  function toggleStock(id, completed) {
    setStocks(currentStocks => {
      return currentStocks.map(stock => {
        if (stock.id === id) {
          return { ...stock, completed }
        }

        return stock
      })
    })
  }

  function deleteStock(id) {
    setStocks(currentStocks => {
      return currentStocks.filter(stock => stock.id !== id)
    })
  }

  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);

  useEffect(() => {
    fetchStock();
  }, []);

  function fetchStock(symbol) {
    const pointerToThis = this;
    const API_KEY = "UMQO1CLDVQKAFLQH";
    let API_Call = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&outputsize=compact&apikey=${API_KEY}' + '&symbol=' + 'IBM';
    let stockChart_X = [];
    let stockChart_Y = [];

    fetch(API_Call)
      .then(
        function(response) {
          return response.json()
        }
      )
      .then(
        function(data) {
          console.log(data);
          for (var key in data['Time Series (Daily)']) {
            stockChart_X.push(key);
            stockChart_Y.push(data['Time Series (Daily)'][key]['1. open']);
          }

          setStockChartXValues(stockChart_X);
          setStockChartYValues(stockChart_Y);
          
        }
      )
  }

  return (
    <>
      <center><h1 className="header">Stock Market</h1></center>
      <NewStockForm onSubmit={addStock} />
      <center><h1 className="header">Your Favorites</h1></center>
      <StockList stocks={stocks} toggleStock={toggleStock} deleteStock={deleteStock} />
      {/* <StockChart stockChartX={stockChartXValues} stockChartY={stockChartYValues}/> */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Plot
          data={[
            {
              x: stockChartXValues,
              y: stockChartYValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'red' }
            }
          ]}
          layout={{ 
            width: 840, 
            height: 440, 
            title: 'IBM' 
          }}
        />
      </div>
      
    </>
  )
}