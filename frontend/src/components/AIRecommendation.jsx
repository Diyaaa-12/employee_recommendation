import { useState } from 'react'
import axios from 'axios'
import API from '../config'

function AIRecommendation() {

  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAI = async () => {

    try {

      setLoading(true)

      setResult('🤖 AI is analyzing employee performance...')

      const res = await axios.post(
        `${API}/ai/recommend`
      )

      setResult(res.data.result)

    } catch (err) {

      setResult(
        '❌ AI Recommendation Failed'
      )

    }

    setLoading(false)
  }

  return (

    <div style={cardStyle}>

      <h2 style={{ marginBottom: '20px' }}>
        🤖 AI Employee Analytics
      </h2>

      <button
        onClick={handleAI}
        disabled={loading}
        style={btnStyle}
      >

        {
          loading
          ? 'Analyzing Employees...'
          : '🚀 Generate AI Recommendation'
        }

      </button>

      {
        result && (

          <div style={resultBox}>

            <pre style={preStyle}>
              {result}
            </pre>

          </div>

        )
      }

    </div>
  )
}

const cardStyle = {
  background: 'white',
  padding: '25px',
  borderRadius: '12px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  marginTop: '20px'
}

const btnStyle = {
  padding: '12px 18px',
  background: '#8e44ad',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '15px',
  fontWeight: 'bold'
}

const resultBox = {
  marginTop: '20px',
  background: '#f3e8ff',
  padding: '18px',
  borderRadius: '10px',
  border: '1px solid #d8b4fe'
}

const preStyle = {
  whiteSpace: 'pre-wrap',
  fontFamily: 'Arial',
  lineHeight: '1.8',
  margin: 0,
  color: '#333'
}

export default AIRecommendation