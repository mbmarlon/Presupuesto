import React from 'react'
import Gasto from './Gasto'

const ListadoGasto = ({
    gastos, 
    setGastoEditar, 
    eliminarGasto,
    filtro,
    gastosFiltrados
  }) => {
  return (
    <div className="Listado-gastos contenedor">
        {
          filtro ? (
            <>
              <h2>{gastosFiltrados.length ? 'Gastos': 'No hay gastos en esta categoría'}</h2>
              {
                gastosFiltrados.map( gasto =>(
                
                  <Gasto
                    key={ gasto.id}
                    gasto = {gasto}
                    setGastoEditar ={setGastoEditar}
                    eliminarGasto = {eliminarGasto}
                  />))
              }
            </>
            ) : (
            <>
            <h2>{gastos.length ? 'Gastos': 'Añade tus gastos'}</h2>
              {
                gastos.map( gasto =>(
                  <Gasto
                      key={ gasto.id}
                      gasto = {gasto}
                      setGastoEditar ={setGastoEditar}
                      eliminarGasto = {eliminarGasto}
                  />))
              }
            </>
          )
        }
    </div>
  )
}

export default ListadoGasto