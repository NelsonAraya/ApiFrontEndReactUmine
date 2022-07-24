import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//importar nuestros componentes
import ShowUsuarios from './componets/ShowUsuarios'
import EditUsuario from './componets/EditUsuario'
import LoginUsuario from './componets/LoginUsuario'
import CreateUsuario from './componets/CreateUsuario'
import ShowColegios from './componets/ShowColegios'
import ListUsuarioColegio from './componets/ListUsuarioColegio'
import NavBarProyecto from './layouts/NavBarProyecto'
import axios from 'axios';
import Home from './componets/Home';


axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('auth_token')
  config.headers.Authorization = token ? 'Bearer '+token : '';
  return config;
})


function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
          <Route path='/login' element= {localStorage.getItem("auth_token") ? <Navigate to="/"/> : <LoginUsuario/>} /> 
          <Route path='/' element={<NavBarProyecto/>}>
                    <Route path='/' element={<Home/>}/>
                    <Route path='usuarios' element={<ShowUsuarios/>}/>
                    <Route path='colegios' element={<ShowColegios/>}/>
                    <Route path='/colegio/:id' element={<ListUsuarioColegio/>}/>
                    <Route path='/create' element={<CreateUsuario/>}/>
                    <Route path='/edit/:id' element={<EditUsuario/>}/>
                    <Route path='*' element={localStorage.getItem("auth_token") ? <Navigate to="/"/> : <LoginUsuario/>}/>
      </Route>   
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
