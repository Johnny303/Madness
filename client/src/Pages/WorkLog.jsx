import React from 'react'
import { useState } from 'react'

const  updateWorkLog = async (id, hours, label) => {
    return await fetch (`/work?id=${id}&hours=${hours}&label=${label}`).then(res => res.json())
} 

const WorkLog = () => {
    const [id, setId] = useState("")
    const [hours, setHours] = useState(null)
    const [label, setLabel] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        updateWorkLog(id, hours, label)
    } 

  return (
    <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="id">Insert id</label>
            <input type="text" name='id' onChange={e => setId(e.target.value)} />
            <label htmlFor="hours">Insert hours</label>
            <input type="text" name='hours' onChange={e => setHours(e.target.value)}/>
            <label htmlFor="label">Insert label</label>
            <input type="text" name='label' onChange={e => setLabel(e.target.value)}/>
            <button type='submit'>Submit</button>
        </form>
    </>
  )
}

export default WorkLog