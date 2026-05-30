import { useState } from 'react'

function Clients() {
  const [clientName, setClientName] = useState('')

  return (
    <div>
      <h1>Clients</h1>

      <div className="form-box">
        <input
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder="Client name"
        />

        <button>Add Client</button>
      </div>
    </div>
  )
}

export default Clients