import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { FormControlLabel, Switch } from "@mui/material";
import logo from "../../../../assets/img/logo.jpeg";
import axios from "axios";

const EditCambioTrmIata = () => {
  const history = useNavigate();
  let location = useLocation();
  const params = useParams();
  const [factorCambio, setFactorCambio] = useState([]);
  const [loading, setLoading] = useState([true]);
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_HOST + "cnfFactorCambio")
      .then((response) => {
        let result = response.data.filter(
          (cambio) => cambio.ID_FACTOR === Number(params.id)
        );
        setFactorCambio(result);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const switchHandler = (e) => {
    setChecked(e.target.checked);
  }


  /* GUARDA LOS CAMBIOS DE EDICION DEL FACTOR Y REDIRIGE A LA RUTA CAMBIOTRMIATA */
  
  const guardar = (e) => {
    e.preventDefault();
    let data = {
      nombre_moneda: document.getElementById("nombre_moneda").value,
      tipo_factor: document.getElementById("tipo_factor").value,
      valor_cambio: document.getElementById("valor_cambio").value,
      estado_cambio: checked,
    };

    axios
      .put(process.env.REACT_APP_API_HOST + "cnfFactorCambio/" + params.id, data)
      .then((response) => {
        alert("Registro actualizado");
        history("/administrador/cambiotrmiata");
      })
      .catch((error) => {
        console.log(error);
      });
  };

/* ESTO ES UNA PRUEBA, BORRAR AL TERMINAR */

  const identificarId = (e) => {
    e.preventDefault();
    let datab = {
        nombre_moneda: document.getElementById("nombre_moneda").value,
        tipo_factor: document.getElementById("tipo_factor").value,
        valor_cambio: document.getElementById("valor_cambio").value,
        estado_cambio: checked,
      };

    const myRegex = /(\d+)(?!.*\d)/;
    const result = myRegex.exec(location.pathname).join("")
    console.log(datab)
  }
/* ESTO ES UNA PRUEBA, BORRAR AL TERMINAR ^^^^^^^^^^^^^^^^*/

  if (loading) {
    return (
      <>
        <div className="text-center">
          <div>
            <LinearProgress />
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
        <button className="btn btn-primary ms-3 mt-3" onClick={(e) =>identificarId(e) }>Location</button>
      </form>
    </>
  );
};


export default EditCambioTrmIata;
