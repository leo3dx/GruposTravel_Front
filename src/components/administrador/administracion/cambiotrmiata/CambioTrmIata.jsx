import React,{useState, useEffect} from 'react';
import { Link} from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import logo  from '../../../../assets/img/logo.jpeg';
import axios from 'axios';

const CnfMoneda = () => {
    
    const [cnfMonedas, setCnfMonedas] = useState([]);
    const [loading, setLoading] = useState([true]);

    useEffect(() => {

        getCnfMoneda();

    },[])

    const getCnfMoneda = () => {
        axios.get(process.env.REACT_APP_API_HOST + 'cnfMoneda')
        .then((response) => {
            setCnfMonedas(response.data)
            setLoading(false);
        }).catch((error) => {
            console.log(error);
        })
    }

    const eliminar = (id) => {
        axios.delete(process.env.REACT_APP_API_HOST + 'cnfMoneda/' + id)
        .then((response) => {
            alert('Registro eliminado');
            getCnfMoneda()
        }).catch(error => {
            console.log(error);
        })
    }

    const buscar = () => {
        let busquedad = document.getElementById('buscar').value;
        if(busquedad === ''){
            getCnfMoneda();
        }else{
            let result = cnfMonedas.filter(
                moneda => moneda.ID_MONEDA === Number(busquedad) 
                || moneda.NOMBRE_MONEDA.toLowerCase() === busquedad.toLowerCase()
                || moneda.ESTADO_MONEDA === (busquedad.toLowerCase() === 'activo' ? true: null)
                || moneda.ESTADO_MONEDA === (busquedad.toLowerCase() === 'inactivo' ? false: null) 
                )
    
            if(result.length > 0){
                setCnfMonedas(result);
            }
        }
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

    return (
        <>  
            <div className="row">
                <label htmlFor="" className="form-label">Buscar</label>
                <form className="form col">
                    <input type="text" className="form-control" id='buscar' onChange={buscar}/>
                </form>
                <div className="col d-flex justify-content-end">
                    <Link to='/administrador/createcnfmoneda' className='btn btn-primary fw-bold' title='Nuevo'>Nuevo</Link>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-hover shadow mt-2">
                        <thead className="fw-none text-center btn-1">
                            <tr>
                                <th>ID</th>
                                <th>Tipo de moneda</th>
                                <th>Estado</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody className="text-center align-middle">
                            {
                                cnfMonedas.map(moneda => (
                                    <>
                                        <tr>
                                            <td>{moneda.ID_MONEDA}</td>
                                            <td>{moneda.NOMBRE_MONEDA}</td>
                                            <td>{moneda.ESTADO_MONEDA === true ? 'Activo' : 'Inactivo'}</td>
                                            <td>
                                                <Link to={'/administrador/editcnfmoneda/'+moneda.ID_MONEDA} className="btn btn-warning p-1 m-1" title='Editar'><EditIcon/></Link>
                                                <button className="btn btn-danger p-1 m-1" onClick={() => eliminar(moneda.ID_MONEDA)} title='Eliminar'><DeleteIcon/></button> 
                                            </td>
                                        </tr>
                                    </>
                                ))
                            }
                                
                        </tbody>
                </table>
            </div>
        </>
    );

}

export default CnfMoneda;