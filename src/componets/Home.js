import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'



const Home = () => {
    const navigate = useNavigate()

    useEffect(()=>{
        if(!localStorage.getItem('auth_token')){
            navigate('/login')
        }
    },[])


  return (
    <div><br></br>
        <div className='container'>
            <div className="card">
            <div className="card-header">
                PRUEBA TECNICA 
            </div>
                <div className='card-body'>
                    <h5 className="card-title">SISTEMA GESTION DE USUARIOS A COLEGIOS PARA OPTAR AL CARGO DESARROLLADOR FULL STACK UMINE</h5>
                    <p className="card-text">Sistema Desarrollado en BACKEND LARAVEL y FRONTEND REACT
                    el sistema consta con validador de rut y  validador de formularios:</p>
                    <br></br>
                    <p>
                    Sistema cuenta con los siguientes modulos:
                    </p>
                    <ul className="list-group">
                        <li className="list-group-item">Crear usuarios</li>
                        <li className="list-group-item">Editar usuarios</li>
                        <li className="list-group-item">Eliminar usuarios</li>
                        <li className="list-group-item">Listar usuarios</li>
                        <li className="list-group-item">Listar colegios</li>
                        <li className="list-group-item">Listar usuarios por colegios</li>
                    </ul>
                    <br></br>
                    <a href="#" className="btn btn-primary">Desarrollado Por : Nelson Araya Vacca</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home