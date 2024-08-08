import React from 'react';
import { Link } from '@inertiajs/react';

export default function Navbar({ user }) {
  console.log("Status User :", user);
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a href='/' className="btn btn-ghost text-xl">SAPA</a>
      </div>
      <div className="flex-none gap-2">
        <ul className="menu menu-horizontal px-1">
          <li><a href='/formulir' className='text-white font-bold'>Formulir</a></li>
        </ul>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {user ?
              <>
                <li>
                  <Link href={route('dashboard')} className="justify-between">
                    Dashboard
                    <span className="bg-green-700 badge text-white">New</span>
                  </Link>
                </li>
                <li><Link href={route('logout')} method="post" as="button">Logout</Link></li>
              </>
              :
              <>
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
              </>
            }
          </ul>
        </div>
      </div>
    </div>
  )
}
