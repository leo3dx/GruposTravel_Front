import React,{useState, useEffect} from 'react';
import { Link} from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import logo  from '../../../assets/img/logo.jpeg';
import axios from 'axios';

const CnfTipoFactor = () => {
    
    const [cnfTipoFactores, setCnfTipoFactor] = useState([]);
    const [loading, setLoading] = useState([true]);

    useEffect(() => {

        getCnfTipoFactor();

    },[])

    const getCnfTipoFactor = () => {
        axios.get(process.env.REACT_APP_API_HOST + 'CnfTipoFactor')
        .then((response) => {
            setCnfTipoFactor(response.data)
            setLoading(false);
        }).catch((error) => {
            console.log(error);
        })
    }

    const eliminar = (id) => {
        axios.delete(process.env.REACT_APP_API_HOST + 'CnfTipoFactor/' + id)
        .then((response) => {
            alert('Registro eliminado');
            getCnfTipoFactor()
        }).catch(error => {
            console.log(error);
        })
    }

    const buscar = () => {
        let busquedad = document.getElementById('buscar').value;
        if(busquedad === ''){
            getCnfTipoFactor();
        }else{
            let result = cnfTipoFactores.filter(
                factor => factor.ID_FACTOR === Number(busquedad) 
                || factor.NOMBRE_FACTOR.toLowerCase() === busquedad.toLowerCase()
                || factor.ESTADO_FACTOR === (busquedad.toLowerCase() === 'activo' ? true: null)
                || factor.ESTADO_FACTOR === (busquedad.toLowerCase() === 'inactivo' ? false: null) 
                )
    
            if(result.length > 0){
                setCnfTipoFactor(result);
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
                    <Link to='/administrador/createCnfTipoFactor' className='btn btn-primary fw-bold' title='Nuevo'>Nuevo</Link>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-hover shadow mt-2">
                        <thead className="fw-none text-center btn-1">
                            <tr>
                                <th>ID</th>
                                <th>Tipo de factor</th>
                                <th>Estado</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody className="text-center align-middle">
                            {
                                cnfTipoFactores.map(factor => (
                                    <>
                                        <tr>
                                            <td>{factor.ID_FACTOR}</td>
                                            <td>{factor.NOMBRE_FACTOR}</td>
                                            <td>{factor.ESTADO_FACTOR === true ? 'Activo' : 'Inactivo'}</td>
                                            <td>
                                                <Link to={'/administrador/editCnfTipoFactor/'+factor.ID_FACTOR} className="btn btn-warning p-1 m-1" title='Editar'><EditIcon/></Link>
                                                <button className="btn btn-danger p-1 m-1" onClick={() => eliminar(factor.ID_FACTOR)} title='Eliminar'><DeleteIcon/></button> 
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

export default CnfTipoFactor;