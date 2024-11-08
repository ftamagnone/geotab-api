import React from 'react';
import { Truck, Calendar, Hash } from 'lucide-react';
import { Device } from '../types/geotab';

interface DeviceListProps {
  devices: Device[];
}

export default function DeviceList({ devices }: DeviceListProps) {
  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <Truck className="w-6 h-6 mr-2" />
        Devices ({devices.length})
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {devices.map((device) => (
          <div
            key={device.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {device.name}
              </h3>
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                {device.deviceType}
              </span>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Hash className="w-4 h-4 mr-2" />
                <span>S/N: {device.serialNumber}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>
                  Active since:{' '}
                  {new Date(device.activeFrom).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}