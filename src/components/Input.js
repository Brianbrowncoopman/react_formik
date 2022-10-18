import React from "react";
import { GroupInput,
  Input,  
  LeyendaError, 
  IconoValidacion, Label } from './../elements/Forms';
  import { faCircleCheck, faTimesCircle } from "@fortawesome/free-solid-svg-icons";


const ComponentInput = ({state, setState, label, placeholder, type, name, leyendaError, regularExp, funcion }) => {
  const onChange = (e) => {
    setState({...state, campo:e.target.value});
  }

  const validacion = () => {
    if(regularExp){
      if(regularExp.test(state.campo)){
        setState({...state, valido:'true'});
      } else {
        setState({...state, valido:'false'});
      }
    }
    if(funcion){
        funcion();
    }
  }
  
  return(
    <div>
      <Label htmlFor={name} valido={state.valido}>{label}</Label>
        <GroupInput>
          <Input type={type}
            placeholder={placeholder}
            id={name}
            value={state.campo}
            onChange={onChange}
            onKeyUp={validacion}
            onBlur={validacion}
            valido={state.valido}

            />
          <IconoValidacion 
            icon={state.valido === 'true' ? faCircleCheck : faTimesCircle} 
            valido={state.valido}

            />
        </GroupInput>
    <LeyendaError valido={state.valido}>{leyendaError} </LeyendaError>
  </div> 
  );
}

export default ComponentInput;