import React from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from "axios"

function App() {
  const [email , setEmail] = useState ("")  
  const [password , setPassword] = useState ("")  
  const  handle1 = (e)=>{
       setEmail(e.target.value)
  }

  const handle2 = (e)=>{
    setPassword(e.target.value)
}

const login = async()=>{
    try{
      const res = await axios.post("http://localhost:3000/login" , {email : email , password : password})

    }catch(err){
      alert(res.data.mesage)
    }
}

  return (
    <div>
      <input type="text" value = {email} onChange={(e)=> handle1(e)}/>
      <input type="text" value ={password} onChange={(e)=> handle2(e)}/>
      <button onClick={()=>login()}>Login</button>
    </div>
  )
}

export default App
