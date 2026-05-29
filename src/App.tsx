import './App.css'

function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <h2>EcomMinds Hub</h2>
        <nav>
          <a>Dashboard</a>
          <a>Campaigns</a>
          <a>AI Generator</a>
          <a>Reports</a>
          <a>Settings</a>
        </nav>
      </aside>

      <main className="main">
        <h1>Welcome to EcomMinds Hub</h1>
        <p>Your AI-powered advertising control center.</p>

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
      </main>
    </div>
  )
}

export default App