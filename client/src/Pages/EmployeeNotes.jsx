import React from "react"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

const fetchEmployee = async id => {
  return await fetch(`/api/employees/${id}`).then(res => res.json())
}

const updateNote = async (id, note) => {
    console.log(id,note);
    return await fetch(`/notes/${id}/?note=${note}`).then(res => res.json())
}

const EmployeeNotes = () => {
  const { id } = useParams()
  const [employee, setEmployee] = useState(null)
  const [note, setNote] = useState("")


  useEffect(() => {
    fetchEmployee(id).then(data => {
      setEmployee(data)
    })
  }, [])

const handleSubmit = (e) => {
    e.preventDefault()
    updateNote(employee._id, note)
}
console.log(employee?._id);
  return <>
    <h1>List of users notes</h1>
    <ul>
        {employee?.notes?.map((note, index) => (
            <li key={index}>{note}</li>
        ))}
    </ul>
    <form onSubmit={handleSubmit}>
    <label htmlFor="note">Insert New Note</label>
    <input type="text" onChange={e => setNote(e.target.value)}/>
    </form>
  </>
}

export default EmployeeNotes
