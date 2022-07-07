import React from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const CreateCnfMoneda = () => {

    const history = useNavigate();

    const guardar = (e) => {

        e.preventDefault();
        
        let data = {
            nombre_moneda : document.getElementById('nombre_moneda').value,
            estado_moneda : Number(document.getElementById('estado_moneda').value)
        }
        axios.post(process.env.REACT_APP_API_HOST + 'cnfMoneda',data)
        .then(response => {
            alert('Registro guardado')
            history('/administrador/cnfmoneda')
        }).catch(err => {
            console.log(err);
        })

    }

    return(
        <>
            <div className="p-2 btn-1 fs-5 text-center">Crear tipo de moneda</div>
            <form className="form-control pt-3" onSubmit={guardar}>
                <div className="row">
                    <div className="col">
                        <label className="form-label">Tipo de moneda</label>
                        <input type="text" id='nombre_moneda' required className="form-control"/>
                    </div>
                    <div className="col">
                        <label className="form-label">Estado</label>
                        <select id="estado_moneda" required className="form-select">
                            <option value="1">Activo</option>
                            <option value="0">Inactivo</option>
                        </select>
                    </div>
                </div>
                <input type="submit" className='btn btn-1 mt-3' value='Guardar'/>
            </form>
        </>
    )

}

export default CreateCnfMoneda;