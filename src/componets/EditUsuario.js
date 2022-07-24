import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate, useParams} from 'react-router-dom'
import { useForm } from 'react-hook-form'


const endpoint = 'http://127.0.0.1:8000/api/usuario/'
const endcolegio = 'http://127.0.0.1:8000/api/colegios'

const Editusuario = () => {

    const [nombre,setNombre] = useState('')
    const [apellidop,setApellidop] = useState('')
    const [apellidom,setApellidom] = useState('')
    const [telefono,setTelefono] = useState(0)
    const [email,setEmail] = useState('')
    const [mycolegio,setMyColegio] = useState(0)
    const [colegios,setColegios] = useState([])
    const navigate = useNavigate()
    const {id} =useParams()
    const Swal = require('sweetalert2')
    const {register, handleSubmit, setValue,  formState: {errors} } = useForm()

    const update = async (e) => {

        await axios.put(endpoint+id,{nombres : nombre, apellidop:apellidop, apellidom:apellidom,telefono:telefono,email:email,colegio:mycolegio})
        Swal.fire({
            icon: 'success',
            title: 'Edicion de Usuario',
            text: 'El Usuario ha sido modificado Correctamente',
          })
        navigate('/usuarios')
    }

    useEffect(() => {
            if(!localStorage.getItem('auth_token')){
                navigate('/login')
            }
            const getUsuarioById = async () => {
                const response  = await axios.get(endpoint+id)
                setNombre(response.data.nombres)
                setApellidop(response.data.apellidop)
                setApellidom(response.data.apellidom)
                setTelefono(response.data.telefono)
                setEmail(response.data.email)
                setMyColegio(response.data.colegio_id)
                setValue("nombre",response.data.nombres);
                setValue("apellidop",response.data.apellidop);
                setValue("apellidom",response.data.apellidom);
                setValue("telefono",response.data.telefono);
                setValue("email",response.data.email);
                setValue("colegio",response.data.colegio_id);
            }
            const getAllColegios = async () => {
                const response  = await axios.get(endcolegio)
                setColegios(response.data)
                //console.log(response.data);
            }
            getAllColegios()
            getUsuarioById()
            // eslint-disabled-next-line react-hooks/exhautive-deps
    },[])

    return (
        <div>
        <h3>EDITAR USUARIO</h3>

        <div className='container '>
                <div className='card'>
                    <div className='card-header bg-info text-white'>
                        Editar Usuario
                    </div>
                     <div className='card-body'>
                        <form onSubmit={handleSubmit(update)} autoComplete='off'>
                            <div className='mb-3'>
                                <label className='form-label'>INGRESE NOMBRES</label>
                                <input
                                    {...register('nombre',{
                                        required:true,
                                        maxLength:50
                                    })}
                                    onChange={(e)=>setNombre(e.target.value)}
                                    type="text"
                                    className='form-control'/>
                                    {errors.nombre?.type === 'required' && <small className='text-warning bg-dark'>El Campo no pude estar vacio</small> }
                                    {errors.nombre?.type === 'maxLength' && <small className='text-warning bg-dark'>No pude Superar los 50 Caracteres</small> }
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>APELLIDO PATERNO</label>
                                <input
                                    value={apellidop}
                                    {...register('apellidop',{
                                        required:true,
                                        maxLength:50
                                    })}
                                    onChange={(e)=>setApellidop(e.target.value)}
                                    type="text"
                                    className='form-control'/>
                                    {errors.apellidop?.type === 'required' && <small className='text-warning bg-dark'>El Campo no pude estar vacio</small> }
                                    {errors.apellidop?.type === 'maxLength' && <small className='text-warning bg-dark'>No pude Superar los 50 Caracteres</small> }
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>APELLIDO MATERNO</label>
                                <input
                                    value={apellidom}
                                    {...register('apellidom',{
                                        required:true,
                                        maxLength:20
                                    })}
                                    onChange={(e)=>setApellidom(e.target.value)}
                                    type="text"
                                    className='form-control'/>
                                    {errors.apellidom?.type === 'required' && <small className='text-warning bg-dark'>El Campo no pude estar vacio</small> }
                                    {errors.apellidom?.type === 'maxLength' && <small className='text-warning bg-dark'>No pude Superar los 50 Caracteres</small> }
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>INGRESE TELEFONO</label>
                                <input
                                    value={telefono}
                                    {...register('telefono',{
                                        required:true,
                                        maxLength:20
                                    })}
                                    onChange={(e)=>setTelefono(e.target.value)}
                                    type="text"
                                    className='form-control'/>
                                    {errors.telefono?.type === 'required' && <small className='text-warning bg-dark'>El Campo no pude estar vacio</small> }
                                    {errors.telefono?.type === 'maxLength' && <small className='text-warning bg-dark'>No pude Superar los 20 Caracteres</small> }
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>INGRESE EMAIL</label>
                                    <input
                                        value={email}
                                        {...register('email',{
                                            required:true
                                        })}
                                        onChange={(e)=>setEmail(e.target.value)}
                                        type="email"
                                        className='form-control'/>
                                        {errors.email?.type === 'required' && <small className='text-warning bg-dark'>El Campo no pude estar vacio</small> }
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>COLEGIO</label>
                                    <select
                                        className='form-control'
                                        {...register('colegio',{
                                            required:true
                                        })}
                                        onChange={(e)=>setMyColegio(e.target.value)}
                                    >
                                    {colegios.map((colegio)=>(
                                        <option key={colegio.id} value={colegio.id}>{colegio.nombre}</option>
                                     ))}
                                    </select>
                                    {errors.colegio?.type === 'required' && <small className='text-warning bg-dark'>El Campo no pude estar vacio</small> }
                                </div>              
                            <button type='submit' className='btn btn-success'>Editar Usuario</button>
                        </form>            
                    </div>
                </div>   
        </div>
    </div>
    )
}

export default Editusuario