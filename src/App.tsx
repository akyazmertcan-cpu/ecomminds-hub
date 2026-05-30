import { useEffect, useState } from 'react'
import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'

import Dashboard from './pages/Dashboard'
import Campaigns from './pages/Campaigns'
import Clients from './pages/Clients'
import AIGenerator from './pages/AIGenerator'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Auth from './pages/Auth'

import { supabase } from './lib/supabase'

function App() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (!session) {
    return <Auth />
  }

  return (
    <BrowserRouter>
      <div className="app">
        <aside className="sidebar">
          <div>
            <h2>EcomMinds Hub</h2>

            <nav>
              <Link to="/">Dashboard</Link>
              <Link to="/campaigns">Campaigns</Link>
              <Link to="/clients">Clients</Link>
              <Link to="/ai-generator">AI Generator</Link>
              <Link to="/reports">Reports</Link>
              <Link to="/settings">Settings</Link>
            </nav>
          </div>

          <div className="user-box">
            <span>Signed in as</span>
            <strong>{session.user.email}</strong>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </aside>

        <main className="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/ai-generator" element={<AIGenerator />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App