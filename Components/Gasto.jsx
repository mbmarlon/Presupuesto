import React from 'react'
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
}from 'react-swipeable-list'
import "react-swipeable-list/dist/styles.css"
import PropTypes from 'prop-types';

import {formatearFecha} from '../helpers'

import IconoAhorro from '../img/bank.svg'
import IconoTransporte from '../img/bus.svg'
import IconoComida from '../img/food.svg'
import IconoEntretenimiento from '../img/gift.svg'
import IconoSuscripciones from '../img/spotify.svg'
import IconoCasa from '../img/house.svg'

const diccionarioIconos = {
    ahorro: IconoAhorro,
    comida: IconoComida,
    transporte: IconoTransporte,
    casa: IconoCasa,
    entretenimiento: IconoEntretenimiento,
    suscripciones: IconoSuscripciones
}

const Gasto = ({gasto, setGastoEditar,eliminarGasto}) => {

    //destruc
    const {nombre,cantidad,categoria, id, fecha} = gasto;

    const leadingActions = () =>(
        <LeadingActions>
            <SwipeAction onClick={() => setGastoEditar(gasto)}>
                Editar
            </SwipeAction>
        </LeadingActions>
        )
        
    

    const trailingActions = () =>(
        <TrailingActions>
            <SwipeAction
            onClick={() =>eliminarGasto(id)}
            destructive = {true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
        )


  return (
    <SwipeableList>
        <SwipeableListItem
            leadingActions ={leadingActions()}
            trailingActions ={trailingActions()}
            >
            <div className='gasto sombra'>
                <div className='contenido-gasto'>
                    {/* imagen */}
                    <img src={diccionarioIconos[categoria]}
                        alt="Icono gasto" />
                    <div className='descripcion-gasto'>
                        
                        <p className='categoria'>{categoria}</p>
                        <p className='nombre-gasto'>{nombre}</p>
                        <p className='fecha-gasto'> Agregado el: {''}
                        <span> { formatearFecha(fecha) } </span>
                        </p>
                    </div>
                </div>
                <p className='cantidad-gasto '>${cantidad}</p>
            </div>
        </SwipeableListItem>
    </SwipeableList>
  )
}

export default Gasto