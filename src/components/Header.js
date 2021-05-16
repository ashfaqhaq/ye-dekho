import React from 'react'
import { useLocation,Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
function Header() {

    const location = useLocation()
    const {logout} = useAuth()
    return (
        <div className="mt-5">
          
                
  <div className="flex justify-around items-center flex-shrink-0 text-black text-5xl font-bold mr-6 dance-font">
  <Link to="/"> Ye Dekho </Link>
  </div>
 
  
  <div className="flex justify-around mt-5 dance-font  text-2xl bg-black  py-2 px-3 rounded ">
     
      {location.pathname==="/" || location.pathname==="/search"  ? <button onClick={()=>logout()} className="text-red-400">
        Logout
      </button>:<>
      <Link to="/signup" className="text-white">
        Sign up 
      </Link>
     
      <Link to="/login" className="text-white">
        Login
      </Link>
      </>
       }
    
    </div>
        </div>
    )
}

export default Header



