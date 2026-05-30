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

  async function deleteClient(id: number) {
  const { data, error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id)
    .select()

  if (error) {
    setMessage(error.message)
    return
  }

  if (!data || data.length === 0) {
    setMessage('Delete request worked, but no client was deleted. Check RLS delete policy.')
    return
  }

  setMessage('Client deleted successfully.')
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{new Date(client.created_at).toLocaleString()}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => deleteClient(client.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Clients