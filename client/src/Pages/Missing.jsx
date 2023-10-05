import React from 'react'
import { useState, useEffect } from 'react'
import Loading from "../Components/Loading"
import MissingTable from '../Components/MissingTable'

const fetchEmployees = async () => {
    const res = await fetch("/api/employees")
    return await res.json()
  }

const Missing = () => {
  const [loading, setLoading] = useState(true)
  const [employees, setEmployees] = useState(null)

  useEffect(() => {
    fetchEmployees().then(employees => {
      setLoading(false)
      setEmployees(employees)
    })
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <>
        <MissingTable employees={employees}/>
    </>
  )
}

export default Missing