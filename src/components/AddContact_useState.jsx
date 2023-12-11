import { useState } from "react";

const AddContact_useState = () => {
  const [contact, setContact] = useState([]);
  const [idContact, setIdContact] = useState(1);
  const [editingContactId, setEditingContactId] = useState(null); // New state para el ID del contact en edition

  const addContact = (name, phone, direction) => 
  {
    const newContact = { id: idContact, name, phone, direction };

    setContact([...contact, newContact]);

    setIdContact(idContact + 1);

    resetForm();
  };

  // eliminar un contacto
  const deleteContact = (id) => 
  {
    const deleteOneContact = contact.filter((c) => c.id !== id);

    setContact(deleteOneContact);
  };

  // eliminar TODOS los contactos
  const deleteAllContact = () => 
  {
    setContact([]);
  }

  // Nueva función para editar un contacto
  const editContact = (id) => 
  {
    setEditingContactId(id);
    // Obtener la información del contacto seleccionado para editar
    const contactToEdit = contact.find((c) => c.id === id);

    // Rellenar el formulario con la información del contacto actual
    document.getElementById("name").value = contactToEdit.name;
    document.getElementById("phone").value = contactToEdit.phone;
    document.getElementById("direction").value = contactToEdit.direction || "";
  };

  // Nueva función para manejar la actualización de un contacto editado
  const updateContact = (id, name, phone, direction) => 
  {
    const updatedContacts = contact.map((c) =>
      c.id === id ? { ...c, name, phone, direction } : c
    );

    setContact(updatedContacts);

    setEditingContactId(null); // Restablecer el ID del contacto en edición

    resetForm();
  };

  // reset formularios
  const resetForm = () => 
  {
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("direction").value = "";
  }

  return (
    <div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const name = e.target.name.value;
            const phone = e.target.phone.value;
            const direction = e.target.direction.value;
            if (editingContactId !== null) {
              // Si hay un contacto en edición, actualizarlo
              updateContact(editingContactId, name, phone, direction);
            } else {
              // Si no hay un contacto en edición, agregar uno nuevo
              addContact(name, phone, direction);
            }

          }}
        >
          <label>Name: </label>
          <input type="text" id="name" name="name" required />

          <br />

          <label>Phone: </label>
          <input type="text" id="phone" name="phone" required />

          <br />

          <label>Direction: </label>
          <input type="text" id="direction" name="direction" />

          <br />

          <button type="submit">
            {editingContactId !== null ? "Update Contact" : "Add Contact"}
          </button>
        </form>
      </div>

      <ul>
        {contact.map((c) => (
            <li key={c.id}>
              {c.name} - {c.phone} - {c.direction}
              <button onClick={() => editContact(c.id)} className="mx-5" > Edit </button>
              <button onClick={() => deleteContact(c.id)} className="mx-5" > Delete </button>
            </li>
          ))}
      </ul>

        <button onClick={deleteAllContact}>Delete all Contacts</button>

    </div>
  );
};

export default AddContact_useState;
