import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import { GeotabAPI } from './services/geotabApi';
import { Device, GeotabCredentials } from './types/geotab';
import LoginForm from './components/LoginForm';
import DeviceList from './components/DeviceList';

const api = new GeotabAPI();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);

  const handleLogin = async (credentials: GeotabCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const success = await api.authenticate(credentials);
      if (success) {
        setIsAuthenticated(true);
        const deviceData = await api.getDevices();
        setDevices(deviceData);
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Failed to connect to Geotab API');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    api.logout();
    setIsAuthenticated(false);
    setDevices([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {isAuthenticated && (
          <div className="flex justify-end mb-8">
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        )}

        <div className="flex flex-col items-center justify-center">
          {error && (
            <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
              {error}
            </div>
          )}

          {!isAuthenticated ? (
            <LoginForm onLogin={handleLogin} isLoading={isLoading} />
          ) : (
            <DeviceList devices={devices} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;