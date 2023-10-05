import React from 'react'
import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";


function Superheroes() {
    const [loading, setLoading] = useState(true);
    const [superheroes, setSuperheroes] = useState(null);

    const fetchSuperheroes = async () => {
        const res = await fetch("/employees/superheros" )
        return await res.json()
    }

    useEffect(() => {
        fetchSuperheroes()
        .then((superheroes) => {
            setLoading(false)
            setSuperheroes(superheroes)
        })
    }, [])

    if (loading) {
        return <Loading/>
    }


  return (

        <EmployeeTable employees={superheroes}  />
  )
}

export default Superheroes