import {useState} from 'react'
import { Mensaje } from './Mensaje';


const NuevoPresupuesto = ({ 
    presupuesto, 
    setPresupuesto, 
    setIsValidPresupuesto 
}) => {

    /* Estados de mensaje*/
    const [mensaje, setMensaje] = useState('');

    /*Validador de presupuesto*/
    const handlePresupuesto = (e) =>{
        e.preventDefault();

        if(!presupuesto || presupuesto <0){
            setMensaje("No es un presupuesto válido");

            /* Para detener la ejecusión de una funcion el return */
            return
        }
        setMensaje('');
        setIsValidPresupuesto(true)

    }
  return (
    <div>
        <form onSubmit={handlePresupuesto} className='formulario'>
            <div className='campo'>
                <label htmlFor="">Presupuesto inicial</label>

                <input 
                    type="number"
                    className='nuevo-presupuesto'
                    placeholder='Añade el presupuesto'
                    /*evento cambio para actualizar prop */
                    onChange={e => setPresupuesto(Number(e.target.value))}
                />
            </div>
            <input type="submit" value="Añadir"/>

            {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje> }
        </form>
    </div>
  )
}

export default NuevoPresupuesto