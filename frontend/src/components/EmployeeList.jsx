import { useEffect, useState } from 'react'
import axios from 'axios'
import API from '../config'

function EmployeeList({ refresh }) {

  const [employees, setEmployees] = useState([])

  useEffect(() => {

    fetchEmployees()

  }, [refresh])

  const fetchEmployees = async () => {

    try {

      const res = await axios.get(
        `${API}/employees`,
        {
          headers: {
            'x-auth-token':
              localStorage.getItem('token')
          }
        }
      )

      setEmployees(res.data)

    } catch (err) {

      console.log(err)

    }

  }

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        'Delete this employee?'
      )

    if (!confirmDelete) return

    try {

      await axios.delete(
        `${API}/employees/${id}`,
        {
          headers: {
            'x-auth-token':
              localStorage.getItem('token')
          }
        }
      )

      fetchEmployees()

    } catch (err) {

      alert('Delete failed')

    }

  }

  return (

    <div style={cardStyle}>

      <h2 style={{ marginBottom: '20px' }}>
        👨‍💼 Employees
      </h2>

      {
        employees.length === 0 && (
          <p>No employees found.</p>
        )
      }

      {
        employees.map(emp => {

          const performanceScore =
            (emp.experience * 10) +
            (emp.skills.length * 15)

          let performanceLevel = 'Average'

          if (performanceScore >= 90) {
            performanceLevel = 'Excellent'
          }

          else if (performanceScore >= 70) {
            performanceLevel = 'Good'
          }

          return (

            <div
              key={emp._id}
              style={employeeCard}
            >

              <div>

                <h3>{emp.name}</h3>

                <p>{emp.email}</p>

                <p>
                  🏢 {emp.department}
                </p>

                <p>
                  🛠 {emp.skills.join(', ')}
                </p>

                <p>
                  📅 Experience:
                  {' '}
                  {emp.experience} years
                </p>

                <p>
                  📊 Performance Score:
                  {' '}
                  {performanceScore}
                </p>

                <p>
                  ⭐ {performanceLevel}
                </p>

              </div>

              <button
                onClick={() =>
                  handleDelete(emp._id)
                }
                style={deleteBtn}
              >

                🗑 Delete

              </button>

            </div>

          )
        })
      }

    </div>
  )
}

const cardStyle = {
  background: 'white',
  padding: '25px',
  borderRadius: '12px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
}

const employeeCard = {
  border: '1px solid #ddd',
  borderRadius: '10px',
  padding: '18px',
  marginBottom: '15px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}

const deleteBtn = {
  background: '#ef4444',
  color: 'white',
  border: 'none',
  padding: '10px 14px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold'
}

export default EmployeeList