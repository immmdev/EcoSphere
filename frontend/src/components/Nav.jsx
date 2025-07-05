import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LogoutBtn from './LogoutBtn';

import authContext from '../contexts/authcontext';
import Logo from './Logo';

function Nav() {
  const { authUser } = useContext(authContext);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authUser },
    { name: 'SignUp', slug: '/signup', active: !authUser },
    { name: 'Dashboard', slug: '/dashboard', active: true },
    { name: 'Communities', slug: '/communities' ,active: true},
    { name: 'Initiative', slug: '/initiative/new',active: true},
    { name: 'MarketPlace', slug: '/marketplace',active: true },
    { name: 'Learn', slug: '/learn' ,active: true},
  ];

  return (
    <header className="py-3 shadow bg-white">
      <nav className="flex items-center justify-between px-6">
        {/* Logo */}  

         <div className="flex items-center gap-4">
          <Link to="/">
            <Logo width="70px" />
          </Link>
        </div> 
      

        {/* Navigation Links */}
        <ul className="flex items-center gap-2">
          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="px-6 py-2 hover:bg-green-100 hover:text-black rounded-full transition duration-200"
                  >
                    {item.name}
                  </button>
                </li>
              )
          )}
          {authUser && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
