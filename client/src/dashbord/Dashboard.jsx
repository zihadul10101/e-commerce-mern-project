import React from 'react';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="fixed-sidebar">
      <nav className="bg-white shadow-lg h-screen fixed top-0 left-0 min-w-[250px] py-6 px-4 font-[sans-serif] overflow-auto">
        <NavLink to="/">
          <img
            src="https://readymadeui.com/readymadeui.svg"
            alt="logo"
            className="w-[160px]"
          />
        </NavLink>
        
        <ul className="mt-6">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => isActive ? "text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all" : "text-black hover:text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-[18px] h-[18px] mr-4"
                viewBox="0 0 512 512"
              >
                <path d="..." />
              </svg>
              <span>Dashboard</span>
            </NavLink>
          </li>
          {/* Add more menu items here with appropriate links */}
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
