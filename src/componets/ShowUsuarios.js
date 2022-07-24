import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

const endpoint = 'http://127.0.0.1:8000/api'

const ShowUsuarios = () => {
   
    const [usuarios,setUsuarios] = useState([])
    const navigate = useNavigate()
    const Swal = require('sweetalert2')
    
    useEffect(()=>{
        if(!localStorage.getItem('auth_token')){
            navigate('/login')
        }
        getAllUsuarios()
    },[])

    const getAllUsuarios = async ()=>{

       const response= await axios.get(endpoint+'/usuarios')
       setUsuarios(response.data)
       
    }
    const deletelUsuario = async (e)=>{
         await axios.delete(endpoint+'/usuario/'+e+'/destroy')
        getAllUsuarios()
    }

   const menssageConfirm = (e)=>{
    Swal.fire({
        title: '¿Esta seguro ?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar',
        cancelButtonText: 'No!'
      }).then((result) => {
        if (result.isConfirmed) {
            deletelUsuario(e)
          Swal.fire(
            'Eliminado!',
            'El Usuario ha sido Eliminado',
            'success'
          )
        }
      })
}   

  return (
    <div> 
        <div className='container'>
        <div className='d-flex align-items-end'>
            <Link to="/create" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Crear</Link>
        </div>
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
                        <th>ACCIONES</th>
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
                            <td>
                                <Link to={'/edit/'+usuario.id} className='btn btn-warning'> Editar</Link>
                                {/* <button onClick={()=>deletelUsuario(usuario.id)} className="btn btn-danger">Eliminar</button> */}
                                <button onClick={()=>menssageConfirm(usuario.id)}  className="btn btn-danger">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ShowUsuarios