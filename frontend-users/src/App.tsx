import { useState } from 'react';
import { useUsers } from './hooks/useUsers';
import { UserForm } from './components/UserForm';
import type { IUser } from './types/User';

function App() {
  const { users, loading, addUser, updateUser, deleteUser } = useUsers();
  const [editingUser, setEditingUser] = useState<IUser | null>(null);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Gestión de Usuarios</h1>

      {/* Formulario para Crear y Editar */}
      <UserForm 
        onAdd={addUser} 
        onUpdate={(u) => { updateUser(u); setEditingUser(null); }}
        userToEdit={editingUser}
        onCancelEdit={() => setEditingUser(null)}
      />

      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {users.map((user) => (
            <li 
              key={user.id} 
              style={{ 
                borderBottom: '1px solid #eee', 
                padding: '10px', 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <strong>{user.name}</strong> ({user.email})
                <br />
                <small style={{ color: '#666' }}>ID: {user.id}</small>
              </div>
              <div>
                {/* Botón Editar (Tarea de clase) */}
                <button 
                  onClick={() => setEditingUser(user)}
                  style={{ marginRight: '5px', backgroundColor: '#ffc107', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                >
                  Editar
                </button>
                
                {/* Botón Eliminar (Tarea de clase) */}
                <button 
                  onClick={() => deleteUser(user.id)}
                  style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;