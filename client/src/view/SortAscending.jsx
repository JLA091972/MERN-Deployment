import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'



const SortAscending = () => {
    const [noteList, setNoteList] = useState([])
    // const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/notes')
            .then((response) => {
                console.log('Response contains:', response.data)
                response.data.sort(function (a,b){
                    let data1 = a.createdAt.toLowerCase()
                    let data2 = b.createdAt.toLowerCase()
                    if (data1 > data2){
                        return 1
                    } else {
                        return -1
                    }
                })
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
            <p> Leave a Note <button className='btn btn-outline-dark'><Link to={'/sortdescending'}>Sort Date Descending</Link> </button>
            <button className='btn btn-outline-dark'><Link to={'/sortascending'}>Sort Date Ascending</Link></button>
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

export default SortAscending