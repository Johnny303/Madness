import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
const fetchEmployee = async(id) => {
    return await fetch(`/api/employees/${id}`).then(res => res.json())
}

const EmployeeShowLog = () => {
    const {id} = useParams()
    const [employee, setEmployee] = useState(null)

    useEffect(() => {
        fetchEmployee(id).then(data => setEmployee(data))
    }, [])

    console.log(employee);
    


    console.log(id);
  return (
    <>
        {employee && employee?.workLog.map(log => <>
            <h1>Hours: {log.hours}</h1>
            <p>Label: {log.label}</p>
        </>)  }
    </>
  )
}

export default EmployeeShowLog