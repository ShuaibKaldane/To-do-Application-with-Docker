import { useState } from "react"
import API from "../api"
import { useNavigate, Link } from "react-router-dom"
import toast from "react-hot-toast"

export default function Register(){
  const nav = useNavigate()
  const [form,setForm] = useState({name:"",email:"",password:""})

  const submit = async (e)=>{
    e.preventDefault()
    try{
      await API.post("/auth/register", form)
      toast.success("Registered successfully")
      nav("/login")
    }catch{
      toast.error("Registration failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={submit} className="card w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <input className="input" placeholder="Name"
          onChange={e=>setForm({...form,name:e.target.value})} />

        <input className="input" placeholder="Email"
          onChange={e=>setForm({...form,email:e.target.value})} />

        <input type="password" className="input" placeholder="Password"
          onChange={e=>setForm({...form,password:e.target.value})} />

        <button className="btn w-full">Create Account</button>

        <p className="text-center text-sm">
          Already user? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </form>
    </div>
  )
}
