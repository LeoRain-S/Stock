export function StockItem({ completed, id, title, toggleStock, deleteStock }) {
    return (
      <li>
        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={e => toggleStock(id, e.target.checked)}
          />
          {title}
        </label>
        <button onClick={() => deleteStock(id)} className="btn btn-danger">
          Delete
        </button>
        <button onClick={() => deleteStock(id)} className="btn btn-show">
          Show Graph
        </button>
      </li>
    )
  }