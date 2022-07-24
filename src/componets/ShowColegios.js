import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

const endpoint = 'http://127.0.0.1:8000/api'

const ShowColegios = () => {
   
    const [colegios,setColegios] = useState([])
    const navigate = useNavigate()
    const Swal = require('sweetalert2')
    
    useEffect(()=>{
        if(!localStorage.getItem('auth_token')){
            navigate('/login')
        }
        getAllColegios()
    },[])

    const getAllColegios = async ()=>{

       const response= await axios.get(endpoint+'/colegios')
       setColegios(response.data)
       
    }


  return (
    <div> 
        <div className='container'>
            <table className='table table-striped'>
                <thead className='bg-primary text-white'>
                    <tr>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th>TELEFONO</th>
                        <th>ACCION</th>
                    </tr>
                </thead>
                <tbody>
                    {colegios.map((colegio)=>(
                        <tr key={colegio.id}>
                            <td>{colegio.id}</td>
                            <td>{colegio.nombre}</td>
                            <td>{colegio.telefono}</td>
                            <td>
                                <Link to={'/colegio/'+colegio.id} className='btn btn-success'>  Ver </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ShowColegios