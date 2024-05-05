import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = () => {
  const navigate = useNavigate();
  const token = Cookies.get('access_token'); 
  //console.log("data",token);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3002/api/auth/logout', {
        method: 'POST',
      });
      Cookies.remove('access_token');
      navigate('/'); 
      window.location.reload(); 
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50">
      <div className="flex flex-wrap items-center justify-between gap-5 w-full">
        <div className="uppercase text-gray-800 font-black text-3xl">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'text-blue-600' : 'text-black')}>
            T-valy
          </NavLink>
        </div>

        <div className="flex max-lg:ml-auto space-x-3">
          {token ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login">
                <button
                  className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]"
                >
                  Login
                </button>
              </NavLink>
              <NavLink to="/register">
                <button
                  className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]"
                >
                  Register
                </button>
              </NavLink>
            </>
          )}
        </div>

        <div className="flex lg:hidden">
          <button id="toggleOpen">
            <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
