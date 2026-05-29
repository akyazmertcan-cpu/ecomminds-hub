const campaigns = [
  { name: 'Summer Sale', platform: 'Meta Ads', spend: '$500', ctr: '3.4%', roas: '4.2x' },
  { name: 'Google Search', platform: 'Google Ads', spend: '$750', ctr: '5.1%', roas: '5.7x' },
  { name: 'TikTok Launch', platform: 'TikTok Ads', spend: '$300', ctr: '2.9%', roas: '3.8x' },
  { name: 'Retargeting', platform: 'Instagram', spend: '$420', ctr: '4.1%', roas: '6.1x' },
]

function Campaigns() {
  return (
    <div>
      <h1>Campaigns</h1>
      <p className="page-subtitle">Manage and review your advertising campaigns.</p>

      <div className="table-box">
        <table>
          <thead>
            <tr>
              <th>Campaign</th>
              <th>Platform</th>
              <th>Spend</th>
              <th>CTR</th>
              <th>ROAS</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.name}>
                <td>{campaign.name}</td>
                <td>{campaign.platform}</td>
                <td>{campaign.spend}</td>
                <td>{campaign.ctr}</td>
                <td>{campaign.roas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Campaigns