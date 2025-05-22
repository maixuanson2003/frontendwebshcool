import React from 'react'
import { useAuth } from '../../context/authContext'
const Navbar=()=>{
    const {user,logout}=useAuth();
    const handleLogout =()=>{
        logout();
        window.location.reload();
    }
    return(
        <div className='flex items-center text-white justify-between h-12 bg-teal-600'>
            <p>Welcome {user.name}</p>
            <button onClick={handleLogout} className='px-4 py-1 bg-teal-700 hover:bg-teal-800'>Logout</button>
        </div>
    )
}
export default Navbar;