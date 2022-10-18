import React, { useState } from "react";
import { Formulario, 
  Label, 
  ContenedorBotonCentrado, 
  ContenedorTerminos, 
  Boton, 
  MensajeExito, 
  MensajeError } from "./elements/Forms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import './App.css';
import ComponentInput from "./components/Input";

const App = () => {
  const [nombre, setNombre] = useState({campo:'', valido: null});
  const [apellido, setApellido] = useState({campo:'', valido: null});
  const [password, setPassword] = useState({campo:'', valido: null});
  const [password2, setPassword2] = useState({campo:'', valido: null});
  const [email, setEmail] = useState({campo:'', valido: null});
  const [number, setNumber] = useState({campo:'', valido: null});
  const [terminos, setTerminos] = useState(false);
  const [formularioValido, setFormularioValido] = useState(null);

  const expresions = {
		nombre: /^[a-zA-Z0-9_-]{4,16}$/,
    apellido: /^[a-zA-Z0-9_-]{4,16}$/,
    password: /^.{4,12}$/,
    password2: /^.{4,12}$/,
		email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		number: /^\d{8,15}$/,
	}

  const validarPassword2 = () => {
    if(password.campo.length > 0 ){
        if(password.campo !== password2.campo){
            setPassword2((prevState) => {
              return {...prevState, valido: 'false'}
            });
        } else {
            setPassword2((prevState) => {
              return {...prevState, valido: 'true'}
            })
        }
    }
  }

  const onChangeTerminos = (e) => {
    setTerminos(e.target.checked);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if(
      nombre.valido === 'true' &&
      apellido.valido === 'true' &&
      password.valido === 'true' &&
      password2.valido === 'true' &&
      email.valido === 'true' &&
      number.valido === 'true' &&
      terminos
      ){
          setFormularioValido(true);
          setNombre({campo: '', valido: null});
          setApellido({campo: '', valido: null});
          setPassword({campo: '', valido: null});
          setPassword2({campo: '', valido: null});
          setEmail({campo: '', valido: null});
          setNumber({campo: '', valido: null});
    } else {
      setFormularioValido(false);
    }
  }

  return ( 
    <main>
      <Formulario action="" onSubmit={onSubmit}>
        <ComponentInput
          state={nombre}
          setState={setNombre}
          type="text"
          label="Nombre"
          placeholder="Nombre"
          name="Nombre"
          leyendaError=" El nombre es entre 4 a 16 digitos y puede contener letras o numeros"
          regularExp={expresions.nombre}
        />
        <ComponentInput
          state={apellido}
          setState={setApellido}
          type="text"
          label="Apellido"
          placeholder="Apellido"
          name="Apellido"
          leyendaError=" El Apellido es entre 4 a 16 digitos y puede contener letras o numeros"
          regularExp={expresions.apellido}
        />
        <ComponentInput
          state={password}
          setState={setPassword}
          type="password"
          label="password"
          placeholder="password"
          name="password"
          leyendaError=" El password es entre 4 a 16 digitos y puede contener letras o numeros"
          regularExp={expresions.password}
        />
        <ComponentInput
          state={password2}
          setState={setPassword2}
          type="password"
          label="Reingresa el password"
          placeholder="Reingresa el password"
          name="password2"
          leyendaError=" Ambas contraseñas deben ser iguales"
          regularExp={expresions.password2}
          funcion={validarPassword2}
        />
        <ComponentInput
          state={email}
          setState={setEmail}
          type="email"
          label="email"
          placeholder="ingresa@email.com"
          name="email"
          leyendaError=" El email es entre 4 a 16 digitos y puede contener letras o numeros"
          regularExp={expresions.email}
        />
        <ComponentInput
          state={number}
          setState={setNumber}
          type="text"
          label="Numero de telefono"
          placeholder="0123456789..."
          name="number"
          leyendaError=" El numero es entre 4 a 16 digitos y solo puede contener numeros"
          regularExp={expresions.number}
        />
        


        <ContenedorTerminos>
          <Label>
            <input 
              type="checkbox" 
              name="terminos" 
              id="terminos" 
              checked={terminos}
              onChange={onChangeTerminos}
              />
            Aceptas los terminons y condiciones
          </Label>
        </ContenedorTerminos>
        {formularioValido === false && <MensajeError>
          <p>
            <FontAwesomeIcon icon={faExclamationTriangle}/>
            <b>Error: </b>rellenar correctamente el formulario
          </p>
        </MensajeError>}
        <ContenedorBotonCentrado>
          <Boton type="submit">Enviar</Boton>
          {formularioValido === true && <MensajeExito>Formulario enviado correctamente</MensajeExito>}
        </ContenedorBotonCentrado>
      </Formulario>
    </main>
  );
}



export default App;
