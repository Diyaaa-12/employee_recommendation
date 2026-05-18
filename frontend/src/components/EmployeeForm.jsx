import { useState } from 'react'
import axios from 'axios'
import API from '../config'

function EmployeeForm({ onAdd }) {

  const [form, setForm] = useState({
    name: '',
    email: '',
    department: '',
    skills: '',
    experience: ''
  })

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async () => {

    if (
      !form.name ||
      !form.email ||
      !form.department ||
      !form.skills ||
      !form.experience
    ) {
      setError('Please fill all fields')
      return
    }

    try {

      setLoading(true)
      setError('')

      await axios.post(

        `${API}/employees`,

        {
          ...form,
          skills: form.skills
            .split(',')
            .map(skill => skill.trim())
        },

        {
          headers: {
            'x-auth-token':
              localStorage.getItem('token')
          }
        }

      )

      alert('Employee Added Successfully')

      setForm({
        name: '',
        email: '',
        department: '',
        skills: '',
        experience: ''
      })

      onAdd()

    } catch (err) {

      setError(
        err.response?.data?.error ||
        'Error adding employee'
      )

    }

    setLoading(false)
  }

  return (

    <div style={cardStyle}>

      <h2 style={{ marginBottom: '20px' }}>
        ➕ Add Employee
      </h2>

      {error && (
        <div style={errorStyle}>
          {error}
        </div>
      )}

      <div style={{
        display: 'grid',
        gap: '12px'
      }}>

        <input
          name='name'
          placeholder='Employee Name'
          value={form.name}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name='email'
          placeholder='Email Address'
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name='department'
          placeholder='Department'
          value={form.department}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name='skills'
          placeholder='Skills (React, Node.js, MongoDB)'
          value={form.skills}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type='number'
          name='experience'
          placeholder='Years of Experience'
          value={form.experience}
          onChange={handleChange}
          style={inputStyle}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={btnStyle}
        >

          {
            loading
            ? 'Adding Employee...'
            : '🚀 Add Employee'
          }

        </button>

      </div>

    </div>
  )
}

const cardStyle = {
  background: 'white',
  padding: '25px',
  borderRadius: '12px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  marginBottom: '20px'
}

const inputStyle = {
  padding: '12px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '15px',
  width: '100%',
  boxSizing: 'border-box'
}

const btnStyle = {
  padding: '12px',
  background: '#4f46e5',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '15px',
  fontWeight: 'bold'
}

const errorStyle = {
  background: '#fee2e2',
  color: '#dc2626',
  padding: '10px',
  borderRadius: '6px',
  marginBottom: '15px'
}

export default EmployeeForm