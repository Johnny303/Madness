import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Loading from "../Components/Loading"
import EquipmentForm from "../Components/EquipmentForm"

const updateEquipment = (equipment) => {
    return fetch(`/api/equipment/${equipment._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(equipment),
    }).then((res) => res.json());
  };

const fetchEquipment = id => {
  return fetch(`/api/equipment/${id}`).then(res => res.json())
}

function EquipmentUpdater() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [equipment, setEquipment] = useState(null)
  const [updateLoading, setUpdateLoading] = useState(false)
  const [equipmentLoading, setEquipmentLoading] = useState(true)

  useEffect(() => {
    setEquipmentLoading(true)
    fetchEquipment(id).then(equipment => {
      // console.log(equipment);
      setEquipment(equipment)
      setEquipmentLoading(false)
    })
  }, [id])

  const handleUpdateEquipment = equipment => {
    setUpdateLoading(true)
    console.log(equipment)
    updateEquipment(equipment).then(() => {
      setUpdateLoading(false)
      navigate("/")
    })
  }

  if (equipmentLoading) {
    return <Loading />
  }

  return (
    <EquipmentForm
      equipment={equipment}
      onSave={handleUpdateEquipment}
      disabled={updateLoading}
      onCancel={() => navigate("/")}
    />
  )
}

export default EquipmentUpdater



