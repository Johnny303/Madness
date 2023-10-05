import { useEffect, useState } from "react"

const fetchEquipment = async () => {
  const res = await fetch(`/api/equipment/`)
  return await res.json()
}

const fetchPositions = async () => {
  const res = await fetch(`/api/positions/`)
  return await res.json()
}
const EmployeeForm = ({
  onSave,
  disabled,
  employee,
  onCancel,
  brands,
  companies,
}) => {
  const [equipment, setEquipment] = useState(null)
  const [level, setLevel] = useState("")
  const [positions, setPositions] = useState([])
  useEffect(() => {
    fetchEquipment().then(equipment => {
      setEquipment(equipment)
    })
    fetchPositions().then(positions => {
      setPositions(positions)
    })
  }, [])

  console.log(positions);

  const onSubmit = e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const entries = [...formData.entries()]

    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry
      acc[k] = v
      return acc
    }, {})
    return onSave(employee, previousEquipment)
  }
  let previousEquipment = ""
  if (employee) {
    previousEquipment = employee.equipment
  }
  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={employee ? employee.name : null}
          name="name"
          id="name"
        />
      </div>
      <div className="control">
        <label htmlFor="position">Position:</label>
       <select name="position" id="position">
          {positions.map(position => (<>
            <option value={position.name}>{position.name}</option>
          </>))}
       </select>
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          defaultValue={employee ? employee.level : null}
          name="level"
          id="level"
          onChange={e => {setLevel(e.target.value)}}

        />
      </div>

      {/* <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
        />
      </div> */}
      <div className="control">
        <label htmlFor="company">Company:</label>
        <select name="company" id="company">
          {companies?.map(company => (
            <>
              <option value={company.name}>{company.name}</option>
            </>
          ))}
        </select>
      </div>
      <div className="control">
        <label htmlFor="yearsOfExp">Years Of Experience:</label>
        {level !== "Junior" ? <input type="number" name="yearsOfExp" id="yearsOfExp" /> : <input type="number" name="yearsOfExp" id="yearsOfExp" value="0" readOnly/>} 
      </div>
      <div className="control">
        <label htmlFor="brand">Brand:</label>
        <select name="brand" id="brand">
          Select Brand:
          {employee?.brand ? (
            <>
              <option key={employee.brand.name} value={employee.brand._id}>
                {employee.brand.name}
              </option>
              {brands?.map(
                brand =>
                  employee.brand.name !== brand?.name && (
                    <option key={brand.name} value={brand._id}>
                      {brand.name}
                    </option>
                  )
              )}
            </>
          ) : (
            <>
              <option key="default">Choose a brand</option>
              {brands?.map(brand => (
                <option key={brand.name} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </>
          )}
        </select>
      </div>
      <div className="control">
        <label htmlFor="equipment">Equipment:</label>
        <select name="equipment" id="equipment">
          Select Equipment:
          {employee?.equipment ? (
            <>
              <option value={employee.equipment}>{employee.equipment}</option>
              {equipment?.map(
                equip =>
                  (equip.amount > 0, equip.name !== employee.equipment) && (
                    <option key={equip.name} value={equip.name}>
                      {equip.name}
                    </option>
                  )
              )}
            </>
          ) : (
            <>
              <option key="default">Choose an equipment</option>
              {equipment?.map(
                equip =>
                  equip.amount > 0 && (
                    <option key={equip.name} value={equip.name}>
                      {equip.name}
                    </option>
                  )
              )}
            </>
          )}
        </select>
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default EmployeeForm
