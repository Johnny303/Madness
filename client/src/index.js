import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import reportWebVitals from "./reportWebVitals"
import "./index.css"

import Layout from "./Pages/Layout"
import ErrorPage from "./Pages/ErrorPage"
import EmployeeList from "./Pages/EmployeeList"
import EmployeeCreator from "./Pages/EmployeeCreator"
import EmployeeUpdater from "./Pages/EmployeeUpdater"
import Superheroes from "./Pages/Superheroes"
import EquipmentList from "./Pages/EquipmentList"
import EquipmentUpdater from "./Pages/EquipmentUpdater"
import EquipmentCreator from "./Pages/EquipmentCreator"
import EmployeeSearch from "./Pages/EmployeeSearch"
import Missing from "./Pages/Missing"
import EmployeeWorkLog from "./Pages/EmployeeWorkLog"
import EmployeeShowLog from "./Pages/EmployeeShowLog"

import "./index.css"
import CompanyCreator from "./Pages/CompanyCreator"
import YearsOfExp from "./Pages/YearsOfExp"
import PositionsList from "./Pages/PositionsList"
import TableTest from "./Pages/TableTest"
import FormTest from "./Pages/FormTest"
import EmployeeNotes from "./Pages/EmployeeNotes"
import EmployeeByName from "./Pages/EmployeeByName"
import WorkLog from "./Pages/WorkLog"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <EmployeeList />,
      },
      {
        path: "/create",
        element: <EmployeeCreator />,
      },
      {
        path: "/equipment",
        element: <EquipmentList />,
      },
      {
        path: "/update/:id",
        element: <EmployeeUpdater />,
      },
      {
        path: "/update/equipment/:id",
        element: <EquipmentUpdater />,
      },
      {
        path: "/create/equipment",
        element: <EquipmentCreator />,
      },
      {
        path: "/table-test",
        element: <TableTest />,
      },
      {
        path: "/form-test",
        element: <FormTest />,
      },
      {
        path: "/superheroes",
        element: <Superheroes />,
      },
      {
        path: "/employees/search/:name",
        element: <EmployeeSearch />,
      },
      {
        path: "/yearsOfExp/:years",
        element: <YearsOfExp />,
      },
      {
        path: "/missing",
        element: <Missing />,
      },
      {
        path: "/worklog",
        element: <EmployeeWorkLog />,
      },
      {
        path: "/worklog/:id",
        element: <EmployeeShowLog />,
      },

      { path: "/create/company", element: <CompanyCreator /> },
      {
        path: "/positions",
        element: <PositionsList />,
      },
      {
        path: "/employee/:id/notes",
        element: <EmployeeNotes />,
      },
      {
        path: "/employeeByName",
        element: <EmployeeByName />,
      },
      
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
