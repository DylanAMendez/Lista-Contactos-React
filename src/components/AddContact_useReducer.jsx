import { useReducer, useRef } from "react";

const AddContact_useReducer = () => {


  const [contacts, dispatch] = useReducer((state = [], action) =>
   {
    switch (action.type) 
    {
      case 'add_contact':
        return [
          ...state,
          {
            id: state.length,
            name: action.name,
            phone: action.phone,
            direction: action.direction
          }
        ];

        case 'remove_contact': { return state.filter((c) => c.id !== action.id); }

        case 'remove_all_contacts': return [];

        case 'edit_contact': return state.map( (c)=> c.id === action.id
                             ? {...c, name: action.name, phone: action.phone, direction: action.direction }
                             : c 
                              );
          

      default:  { return state; }
    }
  });

  const nameRef = useRef();
  const phoneRef = useRef();
  const directionRef = useRef();
  const editIdRef = useRef();


  const handleSubmit = (e) => 
  {
    e.preventDefault();
    dispatch({
      type: 'add_contact',
      name: nameRef.current.value,
      phone: phoneRef.current.value,
      direction: directionRef.current.value
    });


    // Limpiar los campos después de agregar el contacto
    nameRef.current.value = '';
    phoneRef.current.value = '';
    directionRef.current.value = '';

  };
 
  const handleRemove = (id) =>
  {
    dispatch({ type: 'remove_contact', id });
  };

  const handleRemoveAllContacts = () => 
  {
    dispatch({ type: 'remove_all_contacts' });
  };

  const handleEditContact = (id) => 
  {
    const contactToEdit = contacts.find( (c)=> c.id === id );

    nameRef.current.value = contactToEdit.name;
    phoneRef.current.value = contactToEdit.phone;
    directionRef.current.value = contactToEdit.phone;

    editIdRef.current = id;
  };

  const handleSaveEditContact = () => 
  {
    dispatch({
      type: 'edit_contact',
      id: editIdRef.current,
      name: nameRef.current,
      phone: phoneRef.current,
      direction: directionRef.current.value
    });

    nameRef.current.value = '';
    phoneRef.current.value = '';
    directionRef.current.value = '';

    editIdRef.current = null;


  }





  return (
    <div>
      <header>Agregar, Eliminar y Editar Contactos con</header>
      <h1 className='mb-16'>useReducer</h1>

      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input type="text" name="name" ref={nameRef} required />
        <br />

        <label>Phone: </label>
        <input type="number" name="phone" ref={phoneRef} required />
        <br />

        <label>Direction: </label>
        <input type="text" name="direction" ref={directionRef} />
        <br />

        <button type="submit">Add contact</button>

      </form>

      <ul>
        {contacts && contacts.map((c, index) => 
        (
            <li key={index}>
              {c.name} - {c.phone} - {c.direction}
              <button onClick={ ()=> handleRemove(c.id) }> Delete </button>
              <button onClick={ ()=> handleEditContact(c.id) } >Edit</button>
            </li>

          ))}

          { editIdRef.current && (
            <div>
               <form onSubmit={(e)=> {e.preventDefault();}}>
               <label>Name: </label>
               <input type="text" name="name" ref={nameRef} required />
                <br />

               <label>Phone: </label>
               <input type="number" name="phone" ref={phoneRef} required />
               <br />

                <label>Direction: </label>
                <input type="text" name="direction" ref={directionRef} />
                <br />

                <button onClick={handleSaveEditContact}>Save Edit</button>

              </form>
            </div>
          ) }

          <button onClick={ ()=> handleRemoveAllContacts() } > Eliminar todos los contactos</button>

       
      </ul>
    </div>
  );
};

export default AddContact_useReducer;
