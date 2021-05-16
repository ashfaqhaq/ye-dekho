import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from "../context/AuthContext"

 
function Login() {

     const [isLoading, setIsLoading] = useState(false)
     const [email, setEmail] = useState()
     
     const {resetPassword} = useAuth()


   async function handleSubmit(e){
        e.preventDefault();
        try{
           setIsLoading(true)
           await resetPassword(email)
           alert("Password reseted successfully")
        }
    catch{
        alert("Error occured")
    }
     }



    return (
        <div className="flex justify-center mx-auto mt-40 mb-8 w-7/12">
           
            <div className="w-full max-w-xs">
           Password Reset
                <form  onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
                        Email
      </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <button disabled={isLoading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                           Reset Password
      </button>
                        <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/login" >
                            Login?
      </Link>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Login
