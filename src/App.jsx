import { useState, useEffect } from 'react'
import Header from './Components/Header'
import Modal from './Components/Modal'
import Filtros from './Components/Filtros'
import ListadoGasto from './Components/ListadoGasto'
import { generarID } from './helpers'

import IconoNuevoGasto from './img/nuevo-gasto.svg'
import { number, object } from 'prop-types'

function App() {

  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) ?? 0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);


  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []);
  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  /* Use effects */
  useEffect(()=>{
    if(Object.keys(gastoEditar).length > 0){
      setModal(true);
      
      setTimeout(() =>{
        setAnimarModal(true);
      }, 500);
    }
  },[gastoEditar])

  useEffect(() =>{
    localStorage.setItem('presupuesto', presupuesto)
  },[presupuesto])

  useEffect(() =>{
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  },[gastos])


  useEffect(() =>{
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
     setIsValidPresupuesto(presupuestoLS);

  },[])

  useEffect(()=>{
    //filtrado de gastos por categoría
    if(filtro){
      
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro);
      setGastosFiltrados(gastosFiltrados);
    }
    

  },[filtro])

  const handleNuevoGasto = ()=>{
    setModal(true);
    setGastoEditar({})

    /* Animación modal */
    setTimeout(() =>{
      setAnimarModal(true);
    }, 500);
  }

  const guardarGasto = gasto =>{
    if(gasto.id){
      //Actualizar
      const gastosActualizados = gastos.map(gastoState => 
        gastoState.id === gasto.id ? gasto : gastoState)
        setGastos(gastosActualizados);
        setGastoEditar({})
    }else{

      //Nuevo gasto
      gasto.id = generarID();
    //Fecha de ingreso del gasto
    gasto.fecha = Date.now();

    //guardar gastos
    setGastos([...gastos, gasto])
    }

    setTimeout(() => {
      setModal(false)
    }, 500);
    
    setAnimarModal(false)
  }

  const eliminarGasto = ( id )=> {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id );

    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos = {gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto && (
        <>
          <main>
            <Filtros
            filtro = {filtro}
            setFiltro={setFiltro}
            />
            <ListadoGasto
              gastos = {gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto ={eliminarGasto}
              filtro ={filtro}
              gastosFiltrados= {gastosFiltrados}
            />
          </main>
          <div className ='nuevo-gasto'>
            <img 
            src = {IconoNuevoGasto} 
            alt = "Icono Nuevo Gasto" 
            onClick = {handleNuevoGasto}
            />
          </div>
        </>
      )}
      {modal && <Modal 
      setModal={setModal}
      animarModal={animarModal}
      setAnimarModal={setAnimarModal}
      guardarGasto={guardarGasto}
      gastoEditar={gastoEditar}
      setGastoEditar = {setGastoEditar}
      />}
    </div>
  )
}

export default App
