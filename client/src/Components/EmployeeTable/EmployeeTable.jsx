import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const fetchRandomHeights = async () => {
  return await fetch("/api/employees/new/createHeight").then(res => res.json())
}

const EmployeeTable = ({ employees, onDelete, onPresent, onNameClick, similarEmployees }) => {

  const handleCreateHeight = () => {
    fetchRandomHeights()
  }


  return (
    <>
  <button onClick={handleCreateHeight}>Create Heights</button>
  <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
         <th onClick={() => onNameClick()}>Name</th>
          <th>Level</th>
          <th>Position</th>
          <th>Brand</th>
          <th>Present</th>
          <th>Years Of Exp</th>
          <th>Height</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
            <td>{employee.brand.name}</td>
            <td><button type="button" onClick={()=> similarEmployees(employee.level, employee.position)}>Show Similar Employees</button></td>
            {employee.yearsOfExp ? <td>{employee.yearsOfExp}</td>:<td>Unknown</td>}
            <td><input type="checkbox" defaultChecked={employee.present} onChange={(e) => onPresent(employee._id, e)}/></td>
            <td>{employee.height}</td>

            <td>
              <Link to={`/update/${employee._id}`}>
                <button type="button">Update</button>
              </Link>
              <Link to={`/worklog/${employee._id}`}>
                <button type="button">Show Log</button>
              </Link>
              <button type="button" onClick={() => onDelete(employee._id)}>
                Delete
              </button>
            </td>

            <td>
              <Link to={`/employee/${employee._id}/notes`}>

              <button type="button">Notes</button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
        </>
);
}

export default EmployeeTable;
