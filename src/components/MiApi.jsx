//Miapi.js
import React, { useState, useEffect} from 'react';
import moment from 'moment'
import 'moment/locale/es';
moment.locale('es');


const MiApi = () => {

    //Contador de la tabla para evitar errores de key
    const titulo = "Listado de paises que hablan español";
    const texto1 ="Paises de habla hispana";
    const texto2 ="Listado de paises";
    const [listaTareas, setListaTareas] = useState([]);
    const [buscarTarea, setBuscarTarea] = useState("");
    const [ordenarFecha, setOrdenarFecha] = useState("d");
    

    

    useEffect(() => {
        consultarFeriados();
        }, []);

    const consultarFeriados = async () => {
        const url = 'https://restcountries.com/v2/lang/es';
        const response = await fetch(url)
        const data = await response.json()
        setListaTareas(data);
    }
            
    //Función al escribir sobre el input del formulario
    let sortFechas=()=>{
            if (ordenarFecha==="a") {
                setOrdenarFecha("d");
                let orden=listaTareas.sort(
                    function (x, y) {
                        let a = x.nativeName.toUpperCase(),
                            b = y.nativeName.toUpperCase();
                        return a === b ? 0 : a > b ? 1 : -1;
                    }
                );
                setListaTareas(orden);
                console.log(ordenarFecha);
                console.log(listaTareas[0]);
                return true;
            }
            else{
                setOrdenarFecha("a");
                let ordenx=listaTareas.sort(
                    function (x, y) {
                        let a = x.nativeName.toUpperCase(),
                            b = y.nativeName.toUpperCase();
                        return a === b ? 0 : a < b ? 1 : -1;
                    }
                );
                setListaTareas(ordenx);
                
                console.log(ordenarFecha);
                console.log(listaTareas[0]);
                return true;
            }
    }

    const capturaBuscar = (e) => {
        setBuscarTarea(e.target.value)
    }

    const procesarListado= () => {
        let lista=[];
        if (buscarTarea === ""){
            lista=listaTareas;
        }
        else{
            lista=listaTareas.filter((tarea) => {
                if (tarea.length !== 0) {
                    if (tarea.nativeName.toUpperCase().includes(buscarTarea.toUpperCase())) {
                        return true;
                    }
                }
                    return false;
            });
        }
        let listado=lista.map((tarea, index) =>
            <tr key={index}>
                <td>{tarea.nativeName}</td>
                <td> {tarea.capital} </td>
                <td>{tarea.region}</td>
                <td> <img src={tarea.flags.png} alt={tarea.name}/>   </td>
                
            </tr>
        )   
        return listado;
    }
    let icono=() =>{
        if (ordenarFecha==="a") return (<i className="fa-solid fa-sort-down text-light"></i>);
        else return (<i className="fa-solid fa-sort-up text-light"></i>);
    }
    return (
        <div className="fondo">
            <div className="bg-dark d-flex justify-content-between p-2 m-1">
                <p className="textoHeader text-light">{titulo}</p>
                <form>
                    <input className="busqueda" id="busqueda" name="busqueda" value={buscarTarea} onChange={capturaBuscar} placeholder="Buscar por nombre de país" />
                </form>
            </div>
            <div className='caja m-1'>
                <img className="estirar" src={process.env.PUBLIC_URL + '/img/fondo.png'} alt="Imagen de fondo" />  
                <h1 className='texto1'>{texto1}</h1>
                <p className='texto2'>{texto2}</p>
            </div>
            
            <table className="table table-striped table-bordered table-hover">
                <tbody >
                    <tr className="bg-dark"><th className="text-light" scope="col">Nombre <button className="btn btn-dark" onClick={sortFechas}>{icono()}
                    </button></th ><th className="text-light align-middle" scope="col">Capital</th>
                    <th className="text-light align-middle" scope="col">Continente</th>
                    <th className="text-light align-middle" scope="col">Bandera</th></tr>
                    {procesarListado()}
                </tbody>
            </table>
            
        </div>
    )
}
export default MiApi;
