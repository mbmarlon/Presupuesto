import {useState, useEffect} from 'react'
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({presupuesto, gastos}) => {

    const [porcentaje, setPorcentaje] = useState(0);
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);


    useEffect(() =>{
        const totalGastado = gastos.reduce( (total,gasto) => 
        gasto.cantidad + total, 0);
         const totalDisponible = presupuesto - totalGastado;

        setGastado(totalGastado)
        setDisponible(totalDisponible)

        //Calcular %
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje);
        }, 1000);
    }, [gastos])

    

    const formatoDinero = (cantidad)=>{
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar
             value={porcentaje}
             styles ={buildStyles({
                 pathColor: '#3b82f6',
                 trailColor: 'f5f5f5',
                 pathTransition: 1,
                 textColor: '#3b82f6'
             })}
             text={`${porcentaje}% Gastado`}
            />
        </div>
        <div className='contenido-presupuesto'>
            <p> <span> Presupuesto: </span> {formatoDinero(presupuesto)}</p>
            <p> <span> Disponible: </span> {formatoDinero(disponible)}</p>
            <p> <span> Gastos: </span> {formatoDinero(gastado)}</p>
        </div>
    </div>
  )
}

export default ControlPresupuesto