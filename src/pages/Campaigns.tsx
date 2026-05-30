import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Campaign = {
  id: number
  client_id: number
  name: string
  platform: string
  created_at: string
}

function Campaigns() {
  const [campaignName, setCampaignName] = useState('')
  const [platform, setPlatform] = useState('')
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [message, setMessage] = useState('')

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
    const { error } = await supabase
      .from('campaigns')
      .insert({
        client_id: 1,
        name: campaignName,
        platform: platform,
      })

    if (error) {
      setMessage(error.message)
      return
    }

    setCampaignName('')
    setPlatform('')
    setMessage('Campaign added successfully.')
    fetchCampaigns()
  }

  useEffect(() => {
    fetchCampaigns()
  }, [])

  return (
    <div>
      <h1>Campaigns</h1>

      <div className="form-box">
        <input
          placeholder="Campaign name"
          value={campaignName}
          onChange={(e) => setCampaignName(e.target.value)}
        />

        <input
          placeholder="Platform (Meta, Google, TikTok)"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        />

        <button onClick={addCampaign}>
          Add Campaign
        </button>

        {message && <p>{message}</p>}
      </div>

      <div className="table-box">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Platform</th>
              <th>Created</th>
            </tr>
          </thead>

          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id}>
                <td>{campaign.name}</td>
                <td>{campaign.platform}</td>
                <td>
                  {new Date(
                    campaign.created_at
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Campaigns