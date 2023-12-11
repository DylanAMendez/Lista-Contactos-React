// ----- useState -----

** - Sumar y Decrementar Contador uno por uno - **

 // -----------------------------
  const [counter, setCounter] = useState(0);

  const addCounter = () => {
    setCounter(counter + 1);
  }

  const removeCounter = () => {
    setCounter(counter - 1);
  }

// ------------------------------

  cuerpo del codigo para el frontend : 

  {/* --- header Con Counter --- */}
    <!-- <header>
      <h1>Add y Remove counter</h1>
    </header> -->

    <button onClick={addCounter}>Add</button>

    <span className='mx-5'>{counter}</span>

    <button onClick={removeCounter} >Remove</button>

// ------------------------------

// -------Aprender como agregar y quitar lista de tareas----------------

