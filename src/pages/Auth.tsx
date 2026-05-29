import { useState } from 'react'
import { supabase } from '../lib/supabase'

function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  async function signUp() {
    const { error } = await supabase.auth.signUp({ email, password })
    setMessage(error ? error.message : 'Account created. Please check your email.')
  }

  async function signIn() {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setMessage(error ? error.message : 'Login successful.')
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    setMessage(error ? error.message : 'Logged out successfully.')
  }

  return (
    <div>
      <h1>Login / Register</h1>
      <p className="page-subtitle">Access your EcomMinds Hub account.</p>

      <div className="form-box">
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
        />

        <button onClick={signIn}>Login</button>
        <button onClick={signUp}>Create Account</button>
        <button onClick={signOut}>Logout</button>

        {message && <p className="page-subtitle">{message}</p>}
      </div>
    </div>
  )
}

export default Auth