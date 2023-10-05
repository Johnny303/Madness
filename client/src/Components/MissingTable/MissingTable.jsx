const EmployeeTable = ({ employees }) => (
  <div className="EmployeeTable">
    <h1 style={{ borderBottom: "1px dotted black", paddingBottom: "5px" }}>
      Missing Employees
    </h1>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Position</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {employees.map(
          employee =>
            !employee.present && (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.level}</td>
                <td>{employee.position}</td>
              </tr>
            )
        )}
      </tbody>
    </table>
  </div>
)

export default EmployeeTable
