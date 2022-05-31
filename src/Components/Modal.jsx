import { useState, useEffect } from 'react';
import { Mensaje } from './Mensaje';
import CerrarBtn from '../img/cerrar.svg';

const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  guardarGasto,
  gastoEditar,
  setGastoEditar
}) => {

  /* use state */
  const [mensaje, setMensaje]= useState("")

  const [nombre, setNombre]= useState("")
  const [cantidad, setCantidad]= useState("")
  const [categoria, setCategoria]= useState("")
  const [fecha, setFecha]= useState("")
  const [id, setId]= useState("")



  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
      setNombre(gastoEditar.nombre);
      setCantidad(gastoEditar.cantidad);
      setCategoria(gastoEditar.categoria);
      setId(gastoEditar.id)
      setFecha(gastoEditar.fecha)
    }
  }, [])


  const ocultarModal = ()=>{
    setTimeout(() => {
      setModal(false)
    }, 500);
    
    setAnimarModal(false)
    setGastoEditar({})
  }

  const handleSubmit= (e) =>{
    e.preventDefault();
    if([nombre,cantidad,categoria].includes('')){
      setMensaje('Llena todos los campos');
      setTimeout(()=>{
        setMensaje('');
      }, 3000)
      return;
    }

    guardarGasto({nombre, cantidad, categoria, id, fecha})
    console.log("enviando form");
  }
  return (
    <div className="modal">
        <div 
        className="cerrar-modal">
          <img 
          src={CerrarBtn}
          alt="Cerrar modal"
          onClick={ocultarModal}
          />
        </div>
        
        <form 
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}>

          <legend>{ gastoEditar.id ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
          {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje> }

          <div className='campo'>
          <label htmlFor="nombre">Gasto</label>
            <input 
            type="text"
            placeholder='¿Qué gastaste?'
            id='nombre'
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            />

            <label htmlFor="cantidad">Cantidad</label>
            <input 
            type="number"
            placeholder='¿Cuanto gastaste?'
            id='cantidad'
            value={cantidad}
            onChange={e => setCantidad(Number(e.target.value))}
            />

            <div className='campo'>
              <label htmlFor="categoria">categoria</label>
              <select 
              name="categoria" 
              id=""
              value={categoria}
              onChange={e => setCategoria(e.target.value)}
              >
                <option value="">Selecciona</option>
                <option value="ahorro">Ahorro</option>
                <option value="comida">Comida</option>
                <option value="transporte">Transporte</option>
                <option value="casa">Casa</option>
                <option value="entretenimiento">Entretenimiento</option>
                <option value="suscripciones">Suscripciones</option>
              </select>
            </div>
            <input type="submit" value={gastoEditar ? "Guardar Cambios" : "Agregar gasto"} />
          </div>

        </form>
    </div>
  )
}

export default Modal