import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CambioTrmIata = () => {

    return (
        <>
            <form className="form">
                <input type="text" />
                <input type="submit" className="btn btn-1 p-1 ms-2 rounded" value="Buscar"/>
            </form>
            <div className="table-responsive">
                <table className="table table-hover shadow mt-2">
                        <thead className="fw-none text-center btn-1">
                            <tr>
                                <th>Moneda</th>
                                <th>Tipo</th>
                                <th>Valor</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody className="text-center align-middle">
                            <tr>
                                <td>Dolar</td>
                                <td>TRM</td>
                                <td>4100</td>
                                <td>05/07/2022</td>
                                <td>Activo</td>
                                <td> 
                                    <button className="btn btn-warning p-1 m-1" title='Editar'><EditIcon/></button>
                                    <button className="btn btn-danger p-1 m-1" title='Eliminar'><DeleteIcon/></button> 
                                </td>
                            </tr>
                        </tbody>
                </table>
            </div>
        </>
    );

}

export default CambioTrmIata;