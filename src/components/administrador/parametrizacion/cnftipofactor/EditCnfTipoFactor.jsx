import React, { useState, useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import logo  from '../../../../assets/img/logo.jpeg';
import axios from 'axios';

const EditCnfTipoFactor = () => {

    const history = useNavigate();
    const params = useParams();
    const [cnfTipoFactor, setCnfTipoFactor] = useState([]);
    const [loading, setLoading] = useState([true]);

    useEffect(() => {

        axios.get(process.env.REACT_APP_API_HOST + 'cnfTipoFactor')
        .then((response) => {
            let result = response.data.filter( factor => factor.ID_FACTOR === Number(params.id));
            setCnfTipoFactor(result);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
        })

    },[]);

    const guardar = (e) => {
        
        e.preventDefault();
        let data = {
            nombre_factor : document.getElementById('nombre_factor').value,
            estado_factor : Number(document.getElementById('estado_factor').value)
        }
        axios.put(process.env.REACT_APP_API_HOST + 'cnfTipoFactor/' + params.id, data)
        .then((response) => {
            alert('Registro actualizado')
            history('/administrador/cnfTipoFactor')
        }).catch((error => {
            console.log(error);
        }))

    }

    if(loading){
        return(
            <>
                <div className='text-center'>
                    <div>
                        <h2>Cargando</h2>
                    </div>
                    <div>
                        <img src={logo} width="300" alt="" />
                    </div>
                </div>
            </>
        );
    }

    return(
        <>
            <div className="p-2 btn-1 text-center">Editar tipo de moenda</div>
            <form className="form-control pt-3" onSubmit={guardar}>
                <div className="row">

                    {
                        cnfTipoFactor.map((factor) => (
                            <>
                                <div className="col">
                                    <label className="form-label">Tipo de factor</label>
                                    <input type="text" id='nombre_factor' className="form-control" defaultValue={factor.NOMBRE_FACTOR}/>
                                </div>
                                <div className="col">
                                    <label className="form-label">Estado</label>
                                    <select id="estado_factor" className="form-select">
                                        {
                                            factor.ESTADO_FACTOR? (
                                                    <>
                                                        <option value="1">Activo</option>
                                                        <option value="0">Inactivo</option>
                                                    </>
                                                )
                                                :(
                                                    <>
                                                        <option value="0">Inactivo</option>
                                                        <option value="1">Activo</option>
                                                    </>
                                                )
                                        }        
                                    </select>
                                </div>
                            </>
                        ))
                    }

                </div>
                <input type="submit" className='btn btn-1 mt-3' value='Guardar'/>
            </form>
        </>
    )

}

export default EditCnfTipoFactor;