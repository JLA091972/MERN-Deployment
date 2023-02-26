import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Create = () => {

    const [title, setTitle] =useState("")
    const [body, setBody] =useState("")
    const [errors, setErrors] = useState([]); 
    
    const navigate = useNavigate()
    const handleSubmit = (e) =>{
        e.preventDefault()
        const note = {title,body}
        axios.post("http://127.0.0.1:8000/api/note/new", note)
        .then ((response) => {
            console.log("Info:", response)
            console.log("This is my handleSubmit :", note)
            navigate("/")
        })
        .catch(err =>{
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
        })
    }
    
    return (
        <div>
            <div className='topLabel'>
            <h1>Write Notes</h1><button className='btn btn-outline-warning'>
                <Link to='/'>go back home</Link></button>
            </div>
            {errors.map((err, index) => <p key={index}>{err}</p>)}
            <form  className='noteEntry' onSubmit={handleSubmit}>
                <div>
                    <label>Note Title</label>
                    <p ><input className='titleEntry' type='text' onChange={(e) => setTitle(e.target.value)}/></p>
                </div>
                <div>
                    <label>Note Body</label>
                    <p><input className='bodyEntry' type='text' onChange={(e) => setBody(e.target.value)}/></p>
                </div>
                <div>
                    <button type='submit' className='btn btn-outline-dark'>Write this note!</button>
                    <button className='btn btn-outline-warning'><Link to='/'>Cancel</Link></button>
                </div>
            </form>

        </div>
    )
}

export default Create