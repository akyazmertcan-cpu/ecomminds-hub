import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Campaign = {
  id: number
  client_id: number
  name: string
  platform: string
  created_at: string
}

type Client = {
  id: number
  name: string
}

function Campaigns() {
  const [campaignName, setCampaignName] = useState('')
  const [platform, setPlatform] = useState('')
  const [clientId, setClientId] = useState('')
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [message, setMessage] = useState('')

  async function fetchClients() {
    const { data, error } = await supabase
      .from('clients')
      .select('id, name')
      .order('created_at', { ascending: false })

    if (error) {
      setMessage(error.message)
      return
    }

    setClients(data || [])
  }

  async function fetchCampaigns() {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setMessage(error.message)
      return
    }

    setCampaigns(data || [])
  }

  async function addCampaign() {
    if (!campaignName.trim() || !platform.trim() || !clientId) {
      setMessage('Please fill all fields.')
      return
    }

    const { error } = await supabase
      .from('campaigns')
      .insert({
        client_id: Number(clientId),
        name: campaignName,
        platform: platform,
      })

    if (error) {
      setMessage(error.message)
      return
    }

    setCampaignName('')
    setPlatform('')
    setClientId('')
    setMessage('Campaign added successfully.')
    fetchCampaigns()
  }

  function getClientName(clientId: number) {
    const client = clients.find((client) => client.id === clientId)
    return client ? client.name : 'Unknown Client'
  }

  useEffect(() => {
    fetchClients()
    fetchCampaigns()
  }, [])

  return (
    <div>
      <h1>Campaigns</h1>
      <p className="page-subtitle">Create and manage campaigns by client.</p>

      <div className="form-box">
        <select
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
        >
          <option value="">Select client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Campaign name"
          value={campaignName}
          onChange={(e) => setCampaignName(e.target.value)}
        />

        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option value="">Select platform</option>
          <option value="Meta Ads">Meta Ads</option>
          <option value="Google Ads">Google Ads</option>
          <option value="TikTok Ads">TikTok Ads</option>
          <option value="Snapchat Ads">Snapchat Ads</option>
        </select>

        <button onClick={addCampaign}>Add Campaign</button>

        {message && <p className="page-subtitle">{message}</p>}
      </div>

      <div className="table-box">
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Campaign</th>
              <th>Platform</th>
              <th>Created</th>
            </tr>
          </thead>

          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id}>
                <td>{getClientName(campaign.client_id)}</td>
                <td>{campaign.name}</td>
                <td>{campaign.platform}</td>
                <td>{new Date(campaign.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Campaigns