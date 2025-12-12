import React, { useState, useEffect } from 'react';
import type { IUser } from '../types/User';

interface Props {
  onAdd: (user: Omit<IUser, 'id'>) => void;
  onUpdate: (user: IUser) => void;
  userToEdit: IUser | null;
  onCancelEdit: () => void;
}

const initialState = { name: '', email: '' };

export const UserForm = ({ onAdd, onUpdate, userToEdit, onCancelEdit }: Props) => {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (userToEdit) {
      setForm({ name: userToEdit.name, email: userToEdit.email });
    } else {
      setForm(initialState);
    }
  }, [userToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userToEdit) {
      // Edición
      onUpdate({ ...userToEdit, ...form });
    } else {
      // Creación
      onAdd({ ...form, created: new Date() });
    }
    setForm(initialState);
    if(userToEdit) onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '15px' }}>
      <h3>{userToEdit ? 'Editar Usuario' : 'Nuevo Usuario'}</h3>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Nombre"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
          style={{ marginRight: '10px' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
      </div>
      <button type="submit">{userToEdit ? 'Actualizar' : 'Guardar'}</button>
      
      {/* Botón cancelar visible solo en edición*/}
      {userToEdit && (
        <button type="button" onClick={() => { onCancelEdit(); setForm(initialState); }} style={{ marginLeft: '10px' }}>
          Cancelar
        </button>
      )}
    </form>
  );
};