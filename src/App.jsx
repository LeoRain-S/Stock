import { useEffect, useState } from "react";
import { NewStockForm } from "./NewStockForm";
import "./style.css";
import { StockList } from "./StockList";
import { SignInPage } from "./Signin";


export default function App() {
  const [stocks, setStocks] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(stocks));
  }, [stocks]);

  function addStock(title) {
    setStocks((currentStocks) => {
      return [
        ...currentStocks,
        { id: crypto.randomUUID(), title, completed: false },
      ];
    });
  }

  function toggleStock(id, completed) {
    setStocks((currentStocks) => {
      return currentStocks.map((stock) => {
        if (stock.id === id) {
          return { ...stock, completed };
        }

        return stock;
      });
    });
  }

  function deleteStock(id) {
    setStocks((currentStocks) => {
      return currentStocks.filter((stock) => stock.id !== id);
    });
  }

  return (
    <>
      <center>
      <SignInPage />
      </center>
      <center>
        <h1 className="header">Stock Market</h1>
      </center>
      <NewStockForm onSubmit={addStock} />
      <center>
        <h1 className="header">Your Watch List</h1>
      </center>
      <StockList
        stocks={stocks}
        toggleStock={toggleStock}
        deleteStock={deleteStock}
      />
    </>
  );
}
