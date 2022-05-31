import {useState,useEffect} from 'react'

const Filtros = ({filtro, setFiltro}) => {
  return (
    <div className='filtros sombra contenedor'>
        <form>
            <div className='campo'>
                <label>filtrar gastos</label>
                <select
                value={filtro}
                onChange={ e => setFiltro(e.target.value)}>
                    <option value="">Todo</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="transporte">Transporte</option>
                    <option value="casa">Casa</option>
                    <option value="entretenimiento">Entretenimiento</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>
        </form>
    </div>
  )
}

export default Filtros