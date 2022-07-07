import React from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const CreateCnfTipoFactor = () => {

    const history = useNavigate();

    const guardar = (e) => {

        e.preventDefault();
        
        let data = {
            nombre_factor : document.getElementById('nombre_factor').value,
            estado_factor : Number(document.getElementById('estado_factor').value)
        }
        axios.post(process.env.REACT_APP_API_HOST + 'cnfTipoFactor',data)
        .then(response => {
            alert('Registro guardado')
            history('/administrador/cnftipofactor')
        }).catch(err => {
            console.log(err);
        })

    }

    return(
        <>
            <div className="p-2 btn-1 fs-5 text-center">Crear tipo de factor</div>
            <form className="form-control pt-3" onSubmit={guardar}>
                <div className="row">
                    <div className="col">
                        <label className="form-label">Tipo de factor</label>
                        <input type="text" id='nombre_factor' required className="form-control"/>
                    </div>
                    <div className="col">
                        <label className="form-label">Estado</label>
                        <select id="estado_factor" required className="form-select">
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

export default CreateCnfTipoFactor;