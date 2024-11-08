export interface GeotabCredentials {
  database: string;
  username: string;
  password: string;
  server?: string;
}

export interface GeotabSession {
  credentials: GeotabCredentials;
  sessionId: string;
  serverUrl: string;
}

export interface Device {
  id: string;
  name: string;
  serialNumber: string;
  deviceType: string;
  activeFrom: string;
  activeTo: string | null;
}