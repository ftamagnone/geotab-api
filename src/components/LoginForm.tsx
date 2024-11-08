import React, { useState } from 'react';
import { KeyRound, Database, User } from 'lucide-react';
import { GeotabCredentials } from '../types/geotab';

interface LoginFormProps {
  onLogin: (credentials: GeotabCredentials) => Promise<void>;
  isLoading: boolean;
}

export default function LoginForm({ onLogin, isLoading }: LoginFormProps) {
  const [credentials, setCredentials] = useState<GeotabCredentials>({
    database: '',
    username: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(credentials);
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <div className="flex justify-center mb-8">
        <div className="p-3 bg-blue-100 rounded-full">
          <KeyRound className="w-8 h-8 text-blue-600" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Geotab API Login
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <Database className="w-4 h-4 mr-2" />
            Database
          </label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={credentials.database}
            onChange={(e) =>
              setCredentials({ ...credentials, database: e.target.value })
            }
          />
        </div>
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <User className="w-4 h-4 mr-2" />
            Username
          </label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />
        </div>
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <KeyRound className="w-4 h-4 mr-2" />
            Password
          </label>
          <input
            type="password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Connecting...' : 'Connect'}
        </button>
      </form>
    </div>
  );
}