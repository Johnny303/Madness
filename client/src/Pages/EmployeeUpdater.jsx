import { useEffect } from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import EmployeeForm from "../Components/EmployeeForm"
import Loading from "../Components/Loading"

const updateEmployee = employee => {
  return fetch(`/api/employees/${employee._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then(res => res.json())
}
const updateEquipment = (equipment) => {
  return fetch(`/api/equipment/decrease/${equipment}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    
  }).then(res => res.json())
}

const fetchBrands = async () => {
  const res = await fetch("/api/brands/")
  return await res.json()
}

const increaseEquipment = (oldEquip) => {
  return fetch(`/api/equipment/increase/${oldEquip}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res => res.json())
}

const fetchEmployee = id => {
  return fetch(`/api/employees/${id}`).then(res => res.json())
}

const fetchEquipment = () => {
  return fetch(`/api/equipment/`).then(res => res.json())
}

const EmployeeUpdater = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [equipment, setEquipment] = useState(null)
  const [employee, setEmployee] = useState(null)
  const [updateLoading, setUpdateLoading] = useState(false)
  const [employeeLoading, setEmployeeLoading] = useState(true)
  const [brands, setBrands] = useState(null)


  useEffect(() => {
    setEmployeeLoading(true)
    fetchEquipment().then(equipment => {
      setEquipment(equipment)
      console.log(equipment)
    })
    fetchEmployee(id).then(employee => {
      setEmployee(employee)
      setEmployeeLoading(false)
    })
    fetchBrands().then(brands => {
      setBrands(brands)
    })
  }, [id])

  const handleUpdateEmployee = (employee, oldEquip) => {
    setUpdateLoading(true)
    console.log(oldEquip);
    updateEquipment(employee.equipment)
    increaseEquipment(oldEquip)
    updateEmployee(employee).then(() => {
      setUpdateLoading(false)
      navigate("/")
    })
  }

  if (employeeLoading) {
    return <Loading />
  }

  return (
    <EmployeeForm
      employee={employee}
      equipment={equipment}
      onSave={handleUpdateEmployee}
      disabled={updateLoading}
      onCancel={() => navigate("/")}
      brands={brands}
    />
  )
}

export default EmployeeUpdater
