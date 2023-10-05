import React from 'react'
import { useState,useEffect } from 'react'
import EmployeeTable from '../Components/EmployeeTable'

const fetchEmployees = async () => {
    return await fetch ("/api/employees").then(res => res.json())
}

const fetchSimilarEmployees = async (level, position) => {
    return await fetch (`api/similar?level=${level}&position=${position}`).then(res => res.json())
}

const EmployeeByName = () => {
    const [employees, setEmployees] = useState([])
    const [searchName, setSearchName] = useState("")
    const [filteredEmployee, setFilteredEmployees] = useState(employees)

    useEffect(() => {
        fetchEmployees().then(data => {
            setEmployees(data)
            setFilteredEmployees(data)
        })
    }, [])

    useEffect(() => {
        const name = searchName.toLowerCase()
        console.log(name);
        const filter = employees?.filter(emp => emp.name.toLowerCase().includes(name))
        setFilteredEmployees(filter)
    }, [searchName])

    const similarEmployees = (level, position) => {
        fetchSimilarEmployees(level, position).then(data => setFilteredEmployees(data))
    }

    console.log(searchName);

  return (
    <>
        <form >
            <label htmlFor="name">Insert Desired Name:</label>
            <input type="text" name="name" id="name" onChange={e => setSearchName(e.target.value)} />
        </form>
        <EmployeeTable employees={filteredEmployee} similarEmployees={similarEmployees}/>
    </>
  )
}

export default EmployeeByName