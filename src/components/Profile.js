// src/components/Profile.js
import React from 'react';
import Layout from './Layout';
import { useAuth } from '../contexts/AuthContext';
import { User } from 'lucide-react';

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <Layout>
      <h1 className="text-2xl font-medium text-gray-900 mb-6">Perfil</h1>
      <div className="max-w-3xl">
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <User className="h-12 w-12 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-medium">{currentUser?.email}</h2>
              <p className="text-gray-500">Usuario</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>
              <div className="flex">
                <input
                  type="email"
                  disabled
                  value={currentUser?.email}
                  className="flex-1 p-2 border rounded-md bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
                Cambiar contraseña
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;