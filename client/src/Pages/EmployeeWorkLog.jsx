import React from 'react'
import { useState, useEffect } from 'react'

const updateWorkLog = async (id, hours, label) => {
    return await fetch(`/work?id=${id}&hours=${hours}&label=${label}`).then(res => res.json())
}

const EmployeeWorkLog = () => {
    const [id, setId] = useState("")
    const [hours, setHours] = useState(null)
    const [label, setLabel] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        updateWorkLog(id, hours,label)
    }


  return (
    <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="id">Enter employee ID:</label>
            <input type="text" name="id" id="id" value={id} onChange={(e) => setId(e.target.value)}/>
            <label htmlFor="hours">Enter employee hours:</label>
            <input type="number" name="hours" id="hours" value={hours} onChange={(e) => setHours(e.target.value)}/>
            <label htmlFor="label">Enter employee label:</label>
            <input type="text" name="label" id="label" value={label} onChange={(e) => setLabel(e.target.value)}/>
            <button type='submit'>Submit the work Log</button>
        </form>
    </>
  )
}

export default EmployeeWorkLog