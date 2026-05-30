import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Client = {
  id: number
  name: string
  created_at: string
}

function Clients() {
  const [clientName, setClientName] = useState('')
  const [clients, setClients] = useState<Client[]>([])
  const [message, setMessage] = useState('')

  async function fetchClients() {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setMessage(error.message)
      return
    }

    setClients(data || [])
  }

  async function addClient() {
    if (!clientName.trim()) return

    const { error } = await supabase
      .from('clients')
      .insert({ name: clientName })

    if (error) {
      setMessage(error.message)
      return
    }

    setClientName('')
    setMessage('Client added successfully.')
    fetchClients()
  }

  useEffect(() => {
    fetchClients()
  }, [])

  return (
    <div>
      <h1>Clients</h1>
      <p className="page-subtitle">Manage your agency clients.</p>

      <div className="form-box">
        <input
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder="Client name"
        />

        <button onClick={addClient}>Add Client</button>

        {message && <p className="page-subtitle">{message}</p>}
      </div>

      <div className="table-box">
        <table>
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{new Date(client.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Clients