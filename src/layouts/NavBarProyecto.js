import React,{useEffect} from 'react'
import { Navbar, Nav, Container, Button} from 'react-bootstrap'
import { Outlet, Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const endpoint = 'http://127.0.0.1:8000/api/logout'

const NavBarProyecto = () => {

  const Swal = require('sweetalert2')
  const navigate = useNavigate()

  const logoutSubmit = async (e) => {

    await axios.post(endpoint).then(res =>{
        if(res.data.status ===200){
            localStorage.removeItem('auth_token')
            localStorage.removeItem('auth_name')
            Swal.fire({
                icon: 'success',
                title: 'Vuelve Pronto...',
                text: res.data.message,
              })
            navigate('/login')
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: res.data.message,
              })
        } 
    })
}

  var AuthButtons = '';
  if(!localStorage.getItem('auth_token')){
      AuthButtons = (
        <>
        <Nav className="me-auto">
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
        </Nav>
        </>
      );
  }else{
      AuthButtons = (
        <>
        <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/usuarios">Usuarios</Nav.Link>
                <Nav.Link as={Link} to="/colegios">Colegios</Nav.Link>
        </Nav>
        <Button onClick={logoutSubmit} variant="outline-danger">Cerrar Sesion</Button>
        </>
      );
  }
  useEffect(() => {
    if(!localStorage.getItem('auth_token')){
        navigate('/login')
    }
})
  return (
    <>
    <Navbar bg="light" expand="lg">
        <Container>
        <Navbar.Brand as={Link} to="/">SYS UMINE-PRUEBA TECNICA</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            {AuthButtons}  
        </Navbar.Collapse>
        </Container>
    </Navbar>

    <section>
        <Outlet></Outlet>
    </section>
  </>
  )
}

export default NavBarProyecto