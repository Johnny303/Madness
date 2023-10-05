import React from "react"
import { useParams } from "react-router-dom"
import EmployeeTable from "../Components/MissingTable/MissingTable"
import { useEffect, useState } from "react"

const fetchByExp = async year => {
    const res = await fetch(`/api/yearsOfExp?years=${year}`)
    if(!res.ok){
      throw Error("Could not find")
    } else {
        return await res.json()
    }

}

const YearsOfExp = () => {
  const { years } = useParams()
  const [employees, setEmployees] = useState(null)

  useEffect(() => {
    fetchByExp(years).then(employees => {
      setEmployees(employees)
    })
  }, [years])

  return (
    <div>
      {employees && years >= 1 ? (
        <EmployeeTable employees={employees} />
      ) : (
        <>Error</>
      )}
    </div>
  )
}

export default YearsOfExp
