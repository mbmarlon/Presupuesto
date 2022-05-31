import {useState, useEffect} from 'react'
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({
    presupuesto,setPresupuesto,
    gastos, setGastos,
    setIsValidPresupuesto
    }) => {

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

    const handleresetApp = () =>{
        const confirmacion = confirm('Esta acción eliminará todos los valores de la app y no se puede desahacer ¿Deseas reiniciar la app?')
        if(confirmacion){
            setGastos([]);
            setPresupuesto(0);
            setIsValidPresupuesto(false)
        }
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar
             value={porcentaje}
             styles ={buildStyles({
                 pathColor: porcentaje > 100? '#dc2626' : '#3b82f6',
                 trailColor: 'f5f5f5',
                 pathTransition: 1,
                 textColor: porcentaje > 100? '#dc2626' : '#3b82f6'
             })}
             text={`${porcentaje}% Gastado`}
            />
        </div>
        <div className='contenido-presupuesto'>
            <button 
            className='reset-app'
            type='button'
            onClick={handleresetApp}
            > Reiniciar app</button>
            <p> <span> Presupuesto: </span> {formatoDinero(presupuesto)}</p>
            <p> <span> Disponible: </span> {formatoDinero(disponible)}</p>
            <p> <span> Gastos: </span> {formatoDinero(gastado)}</p>
        </div>
    </div>
  )
}

export default ControlPresupuesto