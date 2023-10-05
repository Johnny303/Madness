import { Outlet, Link } from "react-router-dom";

import "./Layout.css";

const Layout = () => (
  <div className="Layout">
    <nav>
      <ul>
        <li className="grow">
          <Link to="/">Employees</Link>
        </li>
        <li>
          <Link to="/create">
            <button type="button">Create Employee</button>
          </Link>
        </li>
        <li>
          <Link to="/equipment">
            <button type="button">Equipment</button>
          </Link>
        </li>
        <li>
          <Link to="/missing">
            <button type="button">Missing Employees</button>
          </Link>
        </li>
        <li>
          <Link to="/create/company">
            <button type="button">Create Company</button>
          </Link>
        </li>
        <li>
          <Link to="/positions">
            <button type="button">List Positions</button>
          </Link>
        </li>
      </ul>
    </nav>
        
    <Outlet />
  </div>
);

export default Layout;
