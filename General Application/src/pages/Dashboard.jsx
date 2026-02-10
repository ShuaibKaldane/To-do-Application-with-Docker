import { useEffect,useState } from "react"
import API from "../api"
import toast from "react-hot-toast"

export default function Dashboard(){
  const [tasks,setTasks]=useState([])
  const [title,setTitle]=useState("")

  const load = async ()=>{
    const res = await API.get("/tasks")
    setTasks(res.data)
  }

  useEffect(()=>{load()},[])

  const add = async ()=>{
    if(!title) return
    await API.post("/tasks",{title})
    toast.success("Task added")
    setTitle("")
    load()
  }

  const toggle = async(id)=>{
    await API.put(`/tasks/${id}`)
    load()
  }

  const del = async(id)=>{
    await API.delete(`/tasks/${id}`)
    toast.success("Task deleted")
    load()
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="card max-w-xl mx-auto">

        <h2 className="text-xl font-bold mb-4">My Tasks</h2>

        <div className="flex gap-2 mb-4">
          <input className="input flex-1"
            value={title}
            onChange={e=>setTitle(e.target.value)}
            placeholder="New task" />
          <button onClick={add} className="btn">Add</button>
        </div>

        <div className="space-y-2">
          {tasks.map(t=>(
            <div key={t._id}
              className="flex justify-between p-3 bg-gray-50 rounded-lg">

              <span
                onClick={()=>toggle(t._id)}
                className={`cursor-pointer ${
                  t.completed && "line-through text-gray-400"
                }`}
              >
                {t.title}
              </span>

              <button onClick={()=>del(t._id)}
                className="text-red-500">
                Delete
              </button>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
