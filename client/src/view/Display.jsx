import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// DISPLAY RANDOM NOTE
const Display = () => {
    const [noteList, setNoteList] = useState([])
    // const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/notes')
            .then((response) => {
                console.log('Response contains:', response.data)
                setNoteList(response.data)
            })
            .catch((error) => {
                console.log('Error encountered:', error)

            })
    }, [])



    return (
        <div>
            <div className='topLabel'>
                <h1>NOTE WALL</h1>
                <button className='btn btn-outline-dark'><Link to={'/create'}>Write a Note</Link> </button>
            </div>
            <p> Leave a Note <button className='btn btn-outline-dark'><Link to={'/sortdescending'}>SortDescending</Link> </button>
            <button className='btn btn-outline-dark'><Link to={'/sortascending'}>SortAscending</Link></button>
            </p>

            <hr />
            {
                //store data list mapping to variable infolist
                noteList.map((infolist, i) => {
                    return (
                        <div key={i}>
                            <h1>{infolist.title}</h1>
                            <div className='topLabel'>
                                {infolist.body}
                                <button className='btn btn-outline-dark'><Link to={`/edit/${infolist._id}`}>Edit</Link></button>
                            </div>
                        </div>
                    )
                })
            }
            <button className='btn btn-outline-dark'><Link to={'/details'}>Random Note</Link> </button>

        </div>
    )
}

export default Display