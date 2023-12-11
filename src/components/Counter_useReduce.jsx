
import { useReducer } from "react";

const Counter_useReduce = () => {

    // Definimos el reducer para manejar las acciones
    const contadorUseReducer = (state, action) => 
    {
        switch (action.type) {
            
            case 'sumar':
                {
                    return { count: state.count + 1 };
                }
            
            case 'restar':
                {
                    return { count: state.count - 1 };
                }
            
            default: return { count: state.count };
        }
    }


    // Usamos useReducer con el contadorUseReducer y el estado inicial (count = 0)
    // toma 2 argumentos:
    // 1ero) contadorUseReducer ( que maneja las acciones )
    // 2do) y el estado inicial { count: 0 }
    const [state, dispatch] = useReducer( contadorUseReducer, { count: 0 } );


    // funcion para sumar contador
    const addContador = () => 
    {
        dispatch( { type: 'sumar' } );
    };
    // funcion para restar contador
    const removeContador = () => 
    {
        dispatch( { type: 'restar' } );
    };
   

  return (
    <div>

            <header className="my-10">Contador con useReduce</header>

            <div className="flex justify-center gap-5">
                <button onClick={addContador}>Add</button>
                <p>{state.count}</p>
                <button onClick={removeContador}>Restar</button>
            </div>

           

    </div>
  )
}

export default Counter_useReduce