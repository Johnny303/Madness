import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../Components/Loading'
import EmployeeTable from '../Components/EmployeeTable'

const fetchEmployees = async (employee) => {
    const res = await fetch(`/api/employees/search/${employee}`)
    return await res.json()
  }
  const deleteEmployee = async (id) => {
    const res = await fetch(`/api/employees/${id}`, { method: "DELETE" })
    return await res.json()
  }

const EmployeeSearch = () => {
    const {name} = useParams()
    const [employees, setEmployees] = useState(null)
    const [employeeLoading, setEmployeeLoading] = useState(true)
    const [updateLoading, setUpdateLoading] = useState(false)

    useEffect(() => {
        setEmployeeLoading(true)
        fetchEmployees(name).then((employees) => {
            setEmployeeLoading(false)
            setEmployees(employees)
            setUpdateLoading(false)
        })
    }, [name])

    const handleDelete = id => {
        deleteEmployee(id)
    
        setEmployees(employees => {
          return employees.filter(employee => employee._id !== id)
        })
      }

    if (employeeLoading) {
        return <Loading />
      }

  return (
    <>
        <EmployeeTable employees= {employees} onDelete={handleDelete} />
    </>
  )
}

export default EmployeeSearch