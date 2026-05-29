import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'

import Dashboard from './pages/Dashboard'
import Campaigns from './pages/Campaigns'
import AIGenerator from './pages/AIGenerator'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Auth from './pages/Auth'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <aside className="sidebar">
          <h2>EcomMinds Hub</h2>

          <nav>
            <Link to="/">Dashboard</Link>
            <Link to="/campaigns">Campaigns</Link>
            <Link to="/ai-generator">AI Generator</Link>
            <Link to="/reports">Reports</Link>
            <Link to="/settings">Settings</Link>
            <Link to="/auth">Login</Link>
          </nav>
        </aside>

        <main className="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/ai-generator" element={<AIGenerator />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App