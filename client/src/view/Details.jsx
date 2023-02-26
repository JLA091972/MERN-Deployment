import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'

const Details = () => {
   
    const navigate = useNavigate()
    const { id } = useParams()
    const [note, setNotes] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/notes/random')
            .then((response) => {
                setNotes(response.data.results)
                console.log("Response Details:",response.data.results)
            })
            .catch((err) => {
                console.log("Error encountered: ", err)
            })
    }, [id])


    return (
        <div>
            <div className='topLabel'>
            <h1>Random Note information</h1><button className='btn btn-outline-warning'>
                <Link to='/'>go back home</Link></button>
            </div>
            <hr />
            {
                //store data list mapping to variable infolist
                note.map((infolist, i) => {
                    return (
                        <div key={i}>
                            <h2>{infolist.title}</h2>
                            <div className='topLabel'>
                                {infolist.body}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Details