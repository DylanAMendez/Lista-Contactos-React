
// ----- useRef + useReduce -----

** - Agregar y Quitar Tarea una por una - **
  const inputRef = useRef();

  const [task, dispatch] = useReducer((state = [], action) => 
  {
    switch (action.type) 
    {
      case 'add_task': 
      {
        return [ ...state, { id: state.length, title: action.title } ]
      }

      case 'remove_all_task':
        {
          return [  state.deleteValue() ]
        } 
      
      case 'remove_task':
        {
          return [ ...state.filter( (task, id) => id != action.id ) ]
        }

    }

  } );

  const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch({
      type: 'add_task',
      title: inputRef.current.value
    });
  }



  cuerpo del codigo para el frontend : 
    {/* ------------------------ */}

      <form onSubmit={handleSubmit} >

      <input type="text" name='title' ref={inputRef} required />
      <button onClick={handleSubmit} className='mx-5' > send task </button>
      <button onClick={ ()=> dispatch({type: 'remove_all_task'}) }>Remove all task</button>

      </form>

      <div>
        {task && task.map( (t, id) =>(
          <div key={id}>
            <p>{t.title}</p>
            <button onClick={ ()=> dispatch ({type: 'remove_task', id}) } >remove</button>
          </div>
        ) )}
      </div>

