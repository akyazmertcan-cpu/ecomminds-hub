import { useState } from 'react'

function AIGenerator() {
  const [product, setProduct] = useState('')
  const [audience, setAudience] = useState('')
  const [platform, setPlatform] = useState('Instagram')
  const [result, setResult] = useState('')

  function generateAdCopy() {
    setResult(`
Başlık: ${product} için satışlarını artır!

Reklam Metni: ${audience} kitlesine ulaşmak için ${platform} reklamlarında güçlü ve dikkat çekici kampanyalar oluştur. EcomMinds Hub ile reklamlarını daha akıllı yönet.

CTA: Hemen Başla
`)
  }

  return (
    <div>
      <h1>AI Ad Copy Generator</h1>
      <p className="page-subtitle">Create ad copy ideas for your campaigns.</p>

      <div className="form-box">
        <label>Product / Service</label>
        <input
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="Example: Men's Watch"
        />

        <label>Target Audience</label>
        <input
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          placeholder="Example: Men aged 25-40"
        />

        <label>Platform</label>
        <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
          <option>Instagram</option>
          <option>Facebook</option>
          <option>Google Ads</option>
          <option>TikTok</option>
          <option>Snapchat</option>
        </select>

        <button onClick={generateAdCopy}>Generate Ad Copy</button>
      </div>

      {result && (
        <div className="result-box">
          <h2>Generated Result</h2>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  )
}

export default AIGenerator