import { useState, useEffect } from 'react';
import type { IUser, UserResponse, SingleUserResponse } from '../types/User';
import { HttpClient } from '../utils/HttpClient';

export const useUsers = () => {

  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await HttpClient.get<UserResponse>('/users/all');
      setUsers(data.users);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async (user: Omit<IUser, 'id'>) => {
    try {
      const payload = { 
        user: { 
          ...user, 
          id: -1,
          created: new Date() 
        } 
      };
      const response = await HttpClient.post<SingleUserResponse>('/users/add', payload);
      setUsers(prev => [...prev, response.user]);
    } catch (error) {
      alert('Error al crear usuario');
    }
  };

  const updateUser = async (user: IUser) => {
    try {
      const payload = { user };
      await HttpClient.put('/users/update', payload);
      setUsers(prev => prev.map(u => (u.id === user.id ? user : u)));
    } catch (error) {
      alert('Error al actualizar usuario');
    }
  };

  const deleteUser = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;
    try {
      await HttpClient.delete(`/users/delete/${id}`);
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (error) {
      alert('Error al eliminar usuario');
    }
  };

  return { users, loading, addUser, updateUser, deleteUser };
};