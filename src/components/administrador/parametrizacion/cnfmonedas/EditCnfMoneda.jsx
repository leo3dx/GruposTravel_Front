import React, { useState, useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import logo  from '../../../../assets/img/logo.jpeg';
import axios from 'axios';

const EditCnfMoneda = () => {

    const history = useNavigate();
    const params = useParams();
    const [cnfMoneda, setCnfMoneda] = useState([]);
    const [loading, setLoading] = useState([true]);

    useEffect(() => {

        axios.get(process.env.REACT_APP_API_HOST + 'cnfMoneda')
        .then((response) => {
            let result = response.data.filter( moneda => moneda.ID_MONEDA === Number(params.id));
            setCnfMoneda(result);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
        })

    },[]);

    const guardar = (e) => {
        
        e.preventDefault();
        let data = {
            nombre_moneda : document.getElementById('nombre_moneda').value,
            estado_moneda : Number(document.getElementById('estado_moneda').value)
        }
        axios.put(process.env.REACT_APP_API_HOST + 'cnfMoneda/' + params.id, data)
        .then((response) => {
            alert('Registro actualizado')
            history('/administrador/cnfMoneda')
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
                        cnfMoneda.map((moneda) => (
                            <>
                                <div className="col">
                                    <label className="form-label">Tipo de moneda</label>
                                    <input type="text" id='nombre_moneda' className="form-control" defaultValue={moneda.NOMBRE_MONEDA}/>
                                </div>
                                <div className="col">
                                    <label className="form-label">Estado</label>
                                    <select id="estado_moneda" className="form-select">
                                        {
                                            moneda.ESTADO_MONEDA? (
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

export default EditCnfMoneda;