import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import EmployeeForm from "../Components/EmployeeForm"

const fetchCompanies = async () => {
  const res = await fetch("api/companies/")
  return await res.json()
}

const createEmployee = employee => {
  return fetch("/api/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then(res => res.json())
}

const fetchEquipment = async () => {
  const res = await fetch(`/api/equipment/`)
  return await res.json()
}

const fetchBrands = async () => {
  const res = await fetch("/api/brands/")
  return await res.json()
}

const updateEquipment = equipment => {
  console.log(equipment)
  return fetch(`/api/equipment/decrease/${equipment}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ method: "decrement" }),
  }).then(res => res.json())
}

const EmployeeCreator = () => {
  const [companies, setCompanies] = useState(null)
  const navigate = useNavigate()
  const [equipment, setEquipment] = useState(null)
  const [loading, setLoading] = useState(false)
  const [brands, setBrands] = useState(null)

  useEffect(() => {
    fetchEquipment().then(equipment => {
      console.log(equipment)
      setEquipment(equipment)
    })

    fetchBrands().then(brands => {
      setBrands(brands)
    })

    fetchCompanies().then(companies => {
      setCompanies(companies)
    })


  }, [])

  const handleCreateEmployee = employee => {
    setLoading(true)
    updateEquipment(employee.equipment)
    createEmployee(employee).then(() => {
      setLoading(false)
      navigate("/")
    })
  }

  return (
    <EmployeeForm
      onCancel={() => navigate("/")}
      disabled={loading}
      onSave={handleCreateEmployee}
      equipment={equipment}
      brands={brands}
      companies={companies}
    />
  )
}

export default EmployeeCreator
