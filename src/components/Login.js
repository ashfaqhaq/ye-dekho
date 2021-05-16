import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from "../context/AuthContext"
import { useHistory } from 'react-router'

   
 
function Login() {
    
     const [isLoading, setIsLoading] = useState(false)
     const [email, setEmail] = useState()
     const [password, setPassword] = useState()
     const {login} = useAuth()
     const history  = useHistory()

   
 async function handleLoginPublic(e){
     e.preventDefault();
    await login("aoduw@gmail.com","aoduw@gmail.com")
    history.push("/");
 }

   async function handleSubmit(e){
        e.preventDefault();
        try{
           setIsLoading(true)
           await login(email,password)
           alert("login successful")
           history.push("/")
        }
    catch{
        console.log("Error occured")
       
    }
     }



    return (
        <div className="flex justify-center mx-auto mt-40 mb-8 w-7/12">
           
            <div className="w-full max-w-xs">
            Login 
                <form  onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <button onClick={handleLoginPublic}className="bg-red-400 hover:bg-red-700 shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-white">
                  Login with Dummy account?
              </button>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
                        Email
      </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
      </label>
                        <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"  onChange={(e)=>{setPassword(e.target.value)}}/>
                        {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
                    </div>
                    <div className="flex items-center justify-between">
                        <button disabled={isLoading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Sign In
      </button>
                        <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/resetPassword" >
                            Forgot Password?
      </Link>
     
                    </div>
                </form>
                <div className="flex items-center justify-between">
                <Link className="inline-block align-baseline  font-bold text-sm text-green-500 hover:text-green-800" to="/signup" >
                            New user? Register.
                            
      </Link>
                </div>
              
            </div>
        </div>
    )
}

export default Login
