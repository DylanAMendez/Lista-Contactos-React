import { useState, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
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
    case 'remove_contact':
      return state.filter((c) => c.id !== action.id);
    case 'remove_all_contacts':
      return [];
    case 'edit_contact':
      return state.map((c) =>
        c.id === action.id
          ? { ...c, name: action.name, phone: action.phone, direction: action.direction }
          : c
      );
    default:
      return state;
  }
};

const AddContact = () => {
  const [contacts, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [direction, setDirection] = useState('');
  const [editId, setEditId] = useState(null);

  const handleAddContact = () => {
    dispatch({
      type: 'add_contact',
      name,
      phone,
      direction
    });

    // Limpiar los campos después de agregar el contacto
    setName('');
    setPhone('');
    setDirection('');
  };

  const handleRemoveContact = (id) => {
    dispatch({ type: 'remove_contact', id });
  };

  const handleRemoveAllContacts = () => {
    dispatch({ type: 'remove_all_contacts' });
  };

  const handleEditContact = (id) => {
    // Obtener los datos del contacto que se va a editar
    const contactToEdit = contacts.find((c) => c.id === id);

    // Llenar los campos de edición con los datos del contacto
    setName(contactToEdit.name);
    setPhone(contactToEdit.phone);
    setDirection(contactToEdit.direction);

    // Guardar el ID del contacto que se está editando
    setEditId(id);
  };

  const handleSaveEdit = () => {
    dispatch({
      type: 'edit_contact',
      id: editId,
      name,
      phone,
      direction
    });

    // Limpiar los campos después de guardar la edición
    setName('');
    setPhone('');
    setDirection('');
    setEditId(null);
  };

  return (
    <div>
      <header>Agregar, Eliminar y Editar Contactos con</header>
      <h1 className='mb-16'>useState y useReducer</h1>

      <form>
        <label>Name: </label>
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
        <br />

        <label>Phone: </label>
        <input type="number" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <br />

        <label>Direction: </label>
        <input type="text" name="direction" value={direction} onChange={(e) => setDirection(e.target.value)} />
        <br />

        {editId ? 
         (
          <button type="button" onClick={handleSaveEdit}>Save Edit</button>
         ) 
                : 
         (
          <button type="button" onClick={handleAddContact}>Add contact</button>
         )
        }
      </form>

      <ul>
        {contacts &&
          contacts.map((c, index) => (
            <li key={index}>
              {c.name} - {c.phone} - {c.direction}
              <button onClick={() => handleRemoveContact(c.id)} className="mx-5 my-4" >Remove</button>
              <button onClick={() => handleEditContact(c.id)} >Edit</button>
            </li>
          ))}
      </ul>

      <button onClick={handleRemoveAllContacts} className="my-5">Remove All Contacts</button>
    </div>
  );
};

export default AddContact;
