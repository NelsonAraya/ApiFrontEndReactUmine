import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate, useParams} from 'react-router-dom'


const endcolegio = 'http://127.0.0.1:8000/api/colegio/'

const ListUsuarioColegio = () => {

    const [usuarios,setUsuarios] = useState([])
    const navigate = useNavigate()
    const {id} =useParams()

    const getUsuarioColegio = async () => {
        const response  = await axios.get(endcolegio+id)
        setUsuarios(response.data)
    }


    useEffect(() => {
            if(!localStorage.getItem('auth_token')){
                navigate('/login')
            }
            getUsuarioColegio()
 
    },[])

    return (
    <div> 
        <div className='container'>
            <table className='table table-striped'>
                <thead className='bg-primary text-white'>
                    <tr>
                        <th>ID</th>
                        <th>DV</th>
                        <th>NOMBRES</th>
                        <th>APELLIDO PATERNO</th>
                        <th>APELLIDO MATERNO</th>
                        <th>TELEFONO</th>
                        <th>EMAIL</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario)=>(
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.dv}</td>
                            <td>{usuario.nombres}</td>
                            <td>{usuario.apellidop}</td>
                            <td>{usuario.apellidom}</td>
                            <td>{usuario.telefono}</td>
                            <td>{usuario.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    )
}

export default ListUsuarioColegio