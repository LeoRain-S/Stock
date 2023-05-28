import { StockItem } from "./StockItem"

export function StockList({ stocks, toggleStock, deleteStock }) {
  return (
    <center><ul className="list">
      {stocks.length === 0 && "No Stocks"}
      {stocks.map(stock => {
        return (
          <StockItem
            {...stock}
            key={stock.id}
            toggleStock={toggleStock}
            deleteStock={deleteStock}
          />
        )
      })}
    </ul></center>
  )
}