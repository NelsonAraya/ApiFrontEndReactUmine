import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import {useNavigate} from 'react-router-dom'

const endpoint = 'http://127.0.0.1:8000/api/login'


const LoginUsuario = () => {
    const {register, handleSubmit, formState: {errors} } = useForm()
    const navigate = useNavigate()
    const Swal = require('sweetalert2')
    
    const loginSubmit = async (e) => {
        await axios.post(endpoint,e).then(res =>{
            if(res.data.status ===200){
                localStorage.setItem('auth_token',res.data.token)
                localStorage.setItem('auth_name',res.data.name)
                navigate('/usuarios')
                Swal.fire({
                    icon: 'success',
                    title: 'Bienvenido',
                    text: res.data.message,
                  })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.data.message,
                  })
            } 
        })
    }

  return (
    <div>
        <h3>LOGIN SISTEMA</h3>

        <div className='container '>
                <div className='card'>
                    <div className='card-header bg-primary text-white'>
                        Iniciar Sesion
                    </div>
                     <div className='card-body'>
                        <form onSubmit={handleSubmit(loginSubmit)} autoComplete='off'>
                            <div className='mb-3'>
                                <label className='form-label'>INGRESE EMAIL</label>
                                <input
                                    {...register('email',{
                                        required:true
                                    })}
                                    type="email"
                                    className='form-control'/>
                                    {errors.email?.type === 'required' && <small className='text-warning bg-dark'>El Campo no pude estar vacio</small> }
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>INGRESE PASSWORD</label>
                                <input
                                    {...register('password',{
                                        required:true
                                    })}
                                    type="password"
                                    className='form-control'/>
                                    {errors.password?.type === 'required' && <small className='text-warning bg-dark'>El Campo no pude estar vacio</small> }

                            </div>
                            <button type='submit' className='btn btn-primary'>Iniciar Sesion</button>
                        </form>            
                    </div>
                </div>   
        </div>
    </div>
  )
}

export default LoginUsuario