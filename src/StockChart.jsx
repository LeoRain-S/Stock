export function StockChart({stockChartX, stockChartY}) {
    
    return (

        <div style={{ display: "flex", justifyContent: "center" }}>
            <Plot
            data={[
                {
                x: stockChartX,
                y: stockChartY,
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'red' }
                }
            ]}
            layout={{ 
                width: 840, 
                height: 440, 
                title: 'A Fancy Plot' 
            }}
            />
      </div>
    
    )
  }