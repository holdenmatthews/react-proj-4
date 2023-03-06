import { useState, useContext } from 'react'
import AuthContext from '../store/authContext'
import axios from 'axios'
 
const Auth = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [register, setRegister] = useState(true)

   const baseURL = 'https://socialmtn.devmountain.com'

   const authCtx = useContext(AuthContext)
 
   const submitHandler = e => {
       e.preventDefault()
 
       register ? (
        axios.post(`${baseURL}/register`, {username, password})
            .then((res) => {
                console.log(res.data)
                authCtx.login(res.data.token, res.data.exp, res.data.userId)
            })
            .catch((err) => {
                console.log(err)
                setUsername("")
                setPassword("")
            })
       ) : (
        axios.post(`${baseURL}/login`, {username, password})
            .then((res) => {
                console.log(res.data)
                authCtx.login(res.data.token, res.data.exp, res.data.userId)

            })
            .catch((err) => {
                console.log(err)
                setUsername("")
                setPassword("")
            })
       )
   }

   const handleClick = () => {
    setRegister(!register)
   }
 
   return (
       <main>
           <h1>Welcome!</h1>
           <form className='form auth-form' onSubmit={submitHandler}>
               <input
                   className='form-input'
                   type="text"
                   value={username}
                   placeholder="username"
                   onChange={(e) => setUsername(e.target.value)}
                   />
               <input
                   className='form-input'
                   type="password"
                   value={password}
                   placeholder="password"
                   onChange={(e) => setPassword(e.target.value)}
                   />
               <button className='form-btn'>
                   {register ? 'Sign Up' : 'Login'}
               </button>
           </form>
           <button className='form-btn' onClick={handleClick}>Need to {register ? 'Login' : 'Sign Up'}?</button>
       </main>
   )
}
 
export default Auth