const express = require('express')
const router = express.Router()

const Employee = require('../models/Employee')

const fetch = (...args) =>
  import('node-fetch').then(({default: fetch}) => fetch(...args))

router.post('/recommend', async (req, res) => {

  try {

    const employees = await Employee.find()

    if (employees.length === 0) {

      return res.json({
        result: 'No employees found.'
      })

    }

    const employeeData = employees.map((emp, index) =>

      `${index + 1}.

Name: ${emp.name}

Department: ${emp.department}

Skills: ${emp.skills.join(', ')}

Experience: ${emp.experience} years

`
    ).join('\n')

    const prompt = `

You are an AI Employee Analytics Expert.

Analyze these employees.

Give:

1. Top performer
2. Promotion recommendations
3. Training suggestions
4. Employee rankings
5. Overall company insights

Employees:

${employeeData}

`

    const response = await fetch(

      'https://api.groq.com/openai/v1/chat/completions',

      {

        method: 'POST',

        headers: {

          'Authorization':
            `Bearer ${process.env.GROQ_API_KEY}`,

          'Content-Type':
            'application/json'

        },

        body: JSON.stringify({

          model:
            'llama-3.3-70b-versatile',

          messages: [

            {
              role: 'user',
              content: prompt
            }

          ]

        })

      }

    )

    const data = await response.json()

    const result =
      data?.choices?.[0]?.message?.content
      ||
      'No AI response generated.'

    res.json({ result })

  }

  catch (err) {

    console.log(err)

    res.status(500).json({
      error: err.message
    })

  }

})

module.exports = router