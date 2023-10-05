import React from 'react'
import { useEffect, useState } from 'react'

const fetchPositions = async () => {
    return await fetch("/api/positions").then(res => res.json())
}

const PositionsList = () => {
const [positions, setPositions] = useState([])

    useEffect(() => {
        fetchPositions().then(data => {
            setPositions(data)
        })
    }, [])

    console.log(positions);
  return (
    <>
        <table>
            <thead>
                <tr>
                    <th>Position Name</th>
                    <th>Salary</th>
                </tr>
            </thead>
            <tbody>
                {positions.map(pos => (
                    <tr key={pos._id}>
                        <td>{pos.name}</td>
                        <td>{pos.salary}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
  )
}

export default PositionsList