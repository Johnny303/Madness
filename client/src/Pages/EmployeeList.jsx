import { useEffect, useState } from "react"
import Loading from "../Components/Loading"
import EmployeeTable from "../Components/EmployeeTable"
import { useNavigate } from "react-router-dom"
import Pagination from "../Components/Pagination"
import {fetchEmployees, deleteEmployee, updateEmployee, sortEmployees} from "../Components/Fetches"

const fetchSortedLevels = async (sortMethod) => {
  return await fetch(`api/employees/sortByLevel?sortMethod=${sortMethod}`).then(res => res.json())
}


const EmployeeList = () => {
  const [loading, setLoading] = useState(true)
  const [employees, setEmployees] = useState(null)
  const [filteredEmployees, setFilteredEmployees] = useState(null)
  const [filteredEmployes, setFilteredEmployes] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(10)
  const [nameClick, setNameClick] = useState(true)

 
  const navigate = useNavigate()
  
  useEffect(() => {
    fetchEmployees().then(employees => {
      setLoading(false)
      setEmployees(employees)
      setFilteredEmployees(employees)
    })
    
  }, [])
  

  const handleDelete = id => {
    deleteEmployee(id)

    setFilteredEmployees(employees => {
      return employees.filter(employee => employee._id !== id)
    })

    navigate("/")
  }
  const handleInput = e => {
    let { value } = e.target
    value = value.toLowerCase()
    const filter = employees.filter(
      employee =>
        employee.level.toLowerCase().includes(value) ||
        employee.position.toLowerCase().includes(value)
    )

    setFilteredEmployees(filter)
  }
  const handleHeightInput = e => {
    const minHeight = e.target.value
    const filter = employees.filter(emp => 
    emp.height > minHeight
    )
    setFilteredEmployes(filter)
  }

  const handleChange = e => {
    const { value } = e.target
    let filter = ""

    if (value === "lastName") {
      filter = filteredEmployees.sort((a, b) =>
        a.name.split(" ")[1] > b.name.split(" ")[1] ? 1 : -1
      )
    } else {
      filter = filteredEmployees.sort((a, b) => (a[value] > b[value] ? 1 : -1))
    }

    setFilteredEmployees(filter)
    setFilteredEmployees([...filteredEmployees])
  }

  const handlePresent = (id, e) => {
    const {checked} = e.target
    updateEmployee(id, checked )
  }

  const handleNameClick = () => {
    setNameClick(x => !x)
    nameClick ? sortEmployees(1).then(data => setFilteredEmployees(data)) : sortEmployees(-1).then(data => setFilteredEmployees(data))
    }

    const handleSort = (e) => {
      fetchSortedLevels(e.target.value).then(data => setFilteredEmployes(data))
    }

  if (loading) {
    return <Loading />
  }  

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts  = filteredEmployees.slice(indexOfFirstPost, indexOfLastPost)

  return (
    <>
      <form style={{ display: "inline-flex" }}>

        <input
          style={{ width: "200px" }}
          type="text"
          name="filter"
          placeholder="Search by level or position..."
          onChange={handleInput}
        />
        <input
          style={{ width: "200px" }}
          type="number"
          name="filter"
          placeholder="Search by height..."
          onChange={handleHeightInput}
        />
        <select onChange={handleChange}>
          <option value="">Sort By : </option>
          <option value="name">First Name</option>
          <option value="lastName">Last Name</option>
          <option value="level">Level</option>
          <option value="position">Position</option>
        </select>
        <select onChange={handleSort}>
          <option value="">Sort By Level: </option>
          <option value="1">Sort Ascending</option>
          <option value="-1">Sort Descending</option>
        </select>
      </form>

      <EmployeeTable employees={currentPosts} onNameClick={handleNameClick} onDelete={handleDelete} onPresent={handlePresent} />
      <Pagination  postsPerPage={postsPerPage}   totalPosts={filteredEmployees.length} currentPage={currentPage} paginate={paginate}/>
    </>
  )
}

export default EmployeeList
