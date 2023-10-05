import React from "react"
import { useEffect, useState } from "react"
import Loading from "../Components/Loading/Loading.jsx"
import EquipmentTable from "../Components/EquipmentTable/index.js"
import { Link } from "react-router-dom"

const fetchEquipment = async () => {
  const res = await fetch("/api/equipment")
  return await res.json()
}

const deleteEquipment = async id => {
  const res = await fetch(`/api/equipment/${id}`, { method: "DELETE" })
  return await res.json()
}

function EquipmentList() {
  const [loading, setLoading] = useState(true)
  const [equipment, setEquipment] = useState(null)

  const handleDelete = id => {
    deleteEquipment(id)

    setEquipment(equipment => {
      return equipment.filter(equip => equip._id !== id)
    })
  }

  useEffect(() => {
    fetchEquipment().then(equipment => {
      setLoading(false)
      setEquipment(equipment)
    })
  }, [])

  if (loading) {
    return <Loading />
  }
  return (
    <>
      <EquipmentTable equipment={equipment} onDelete={handleDelete} />
      <Link to="/create/equipment">
        <button type="button">Create Equipment</button>
      </Link>
    </>
  )
}

export default EquipmentList
