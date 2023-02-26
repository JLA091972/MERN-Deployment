import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'

const Edit = () => {

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [errors, setErrors] = useState([]);
    const [loaded, setLoaded] = useState(false)
    const [noteinfo, setNoteinfo] = useState([]);


    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/note/${id}`)
            .then((response) => {
                console.log("Get details:", response.data)
                const note = response.data
                setNoteinfo(response.data)
                setTitle(note.title)
                setBody(note.body)
            })
            .catch(err => console.log("Error getting details found:", err))
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()
        const noteObj = { title, body }
        axios.put(`http://127.0.0.1:8000/api/note/${id}`, noteObj)
            .then((response) => {
                console.log(response.data)
                navigate("/")
            })
            .catch(err => {
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            })
    }

    //handle Delete
    const handleDelete = (e, id) => {
        axios.delete(`http://127.0.0.1:8000/api/note/${id}`)
            .then((response) => {
                console.log("Delete Note :", id)
                setLoaded(!loaded)
                navigate("/")
            })
            .catch((error) => {
                console.log('Error deleting song encountered:', error)
            })
    }



    return (
        <div >
            <div className='topLabel'>
                <h1>NOTE</h1><button className='btn btn-outline-warning'>
                <Link to='/'>go back home</Link></button>
            </div>


            {errors.map((err, index) => <p key={index}>{err}</p>)}
            {
                (title || (title === "")) ?
                    <div>
                        <form className='noteEntry' onSubmit={handleSubmit}>
                            <div>
                                <label>Title</label>
                                <p><input className='titleEntry' type='text' value={title} onChange={(e) => setTitle(e.target.value)} /></p>
                            </div>
                            <div>
                                <label>Note Body</label>
                                <p><input className='bodyEntry' type='text' value={body} onChange={(e) => setBody(e.target.value)} /></p>
                            </div>
                            <div>
                                <button type='submit' className='btn btn-outline-dark'>Edit Note</button>
                                <button className='btn btn-danger' onClick={(e) => { handleDelete(e, noteinfo._id) }}>Delete Note</button>
                            </div>
                        </form>
                    </div>
                    : <h1> Not found</h1>
            }
        </div>
    )
}

export default Edit