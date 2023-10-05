import React from 'react'
import { useState, useEffect } from 'react'

const createCompany = async(name) => {
  return await fetch(`/api/create/company?newCompany=${name}`)
  .then((res) => res.json())
}
const CompanyCreator = () => {
  const [name, setName] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault()
    setName(e.target.name.value);
  }

  useEffect(() => {
    createCompany(name)
  }, [name])
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Insert name</label>
        <input type="text" name="name"placeholder='insertNameHere' />
        <button type='submit'>Create Company</button>
      </form>
    </>
  )
}

export default CompanyCreator