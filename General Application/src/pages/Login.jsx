import { useState } from "react"
import API from "../api"
import { useNavigate, Link } from "react-router-dom"
import toast from "react-hot-toast"

export default function Login(){
  const nav = useNavigate()
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const login = async (e)=>{
    e.preventDefault()
    try{
      const res = await API.post("/auth/login",{email,password})
      localStorage.setItem("token", res.data.token)
      toast.success("Login successful")
      nav("/dashboard")
    }catch{
      toast.error("Invalid credentials")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={login} className="card w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input className="input" placeholder="Email"
          onChange={e=>setEmail(e.target.value)} />

        <input type="password" className="input" placeholder="Password"
          onChange={e=>setPassword(e.target.value)} />

        <button className="btn w-full">Login</button>

        <p className="text-center text-sm">
          New user? <Link to="/register" className="text-blue-600">Register</Link>
        </p>
      </form>
    </div>
  )
}
