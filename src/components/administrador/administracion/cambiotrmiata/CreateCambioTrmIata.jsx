import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {FormControlLabel, Switch} from '@mui/material'

const CreateCnfMoneda = () => {

    const history = useNavigate();
    const [checked, setChecked] = useState(true);

    const switchHandler = (e) => {
        setChecked(e.target.checked);
      }

    const guardar = (e) => {

        e.preventDefault();
        
        let data = {
            nombre_moneda: document.getElementById("nombre_moneda").value,
            tipo_factor: document.getElementById("tipo_factor").value,
            valor_cambio: document.getElementById("valor_cambio").value,
            estado_cambio: checked,
          };

        axios.post(process.env.REACT_APP_API_HOST + 'cnfFactorCambio',data)
        .then(response => {
            alert('Registro guardado')
            history('/administrador/cambiotrmiata')
        }).catch(err => {
            console.log(err);
        })

    }

    return(
        <>
      <div className="p-2 btn-1 text-center">Editar tipo de Cambio</div>
      
      <form className="form-control pt-3" onSubmit={guardar}>
        <div className="row">
          <div className="row">
            <div className="col">
              <label className="form-label">Moneda</label>
              <input
                type="text"
                id="nombre_moneda"
                className="form-control"
                defaultValue='Dolar'
              />
            </div>
            <div className="col">
              <label className="form-label">Tipo de factor</label>
              <select id="tipo_factor" className="form-select">
                <option value="TRM">TRM</option>
                <option value="IATA">IATA</option>
              </select>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <label className="form-label">Valor</label>
              <input
                type="number"
                id="valor_cambio"
                className="form-control"
                defaultValue='1000'
              />
            </div>
            <div className="col d-flex flex-column justify-content-center">
              <label className="form-label">Estado</label>
              <FormControlLabel
                id="estado_cambio"
                control={<Switch checked={checked} onChange={switchHandler}/>}
                label={
                    checked
                    ? "Activo"
                    : "Inactivo"
                }
              />
            </div>
          </div>
        </div>
        <input type="submit" className="btn btn-1 mt-3" value="Guardar" />
      </form>
    </>
    )

}

export default CreateCnfMoneda;