function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      <p className="page-subtitle">
        Overview of your advertising performance.
      </p>

      <div className="cards">
        <div className="card">
          <span>Ad Spend</span>
          <strong>$12,430</strong>
        </div>

        <div className="card">
          <span>Impressions</span>
          <strong>1.2M</strong>
        </div>

        <div className="card">
          <span>Clicks</span>
          <strong>23,400</strong>
        </div>

        <div className="card">
          <span>CTR</span>
          <strong>3.4%</strong>
        </div>

        <div className="card">
          <span>Conversions</span>
          <strong>1,230</strong>
        </div>

        <div className="card">
          <span>ROAS</span>
          <strong>4.8x</strong>
        </div>
      </div>
    </>
  )
}

export default Dashboard