import { GeotabCredentials, GeotabSession } from '../types/geotab';

const API_ENDPOINT = 'https://my.geotab.com/apiv1';

export class GeotabAPI {
  private session: GeotabSession | null = null;

  async authenticate(credentials: GeotabCredentials): Promise<boolean> {
    try {
      const response = await fetch(`${API_ENDPOINT}/Authenticate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          method: 'Authenticate',
          params: {
            database: credentials.database,
            userName: credentials.username,
            password: credentials.password,
          },
        }),
      });

      const data = await response.json();

      if (data.result) {
        this.session = {
          credentials,
          sessionId: data.result.credentials.sessionId,
          serverUrl: data.result.path,
        };
        return true;
      }
      return false;
    } catch (error) {
      console.error('Authentication error:', error);
      return false;
    }
  }

  async getDevices() {
    if (!this.session) {
      throw new Error('Not authenticated');
    }

    try {
      const response = await fetch(`${this.session.serverUrl}/Get`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          method: 'Get',
          params: {
            typeName: 'Device',
            credentials: {
              sessionId: this.session.sessionId,
              database: this.session.credentials.database,
            },
          },
        }),
      });

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error fetching devices:', error);
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return this.session !== null;
  }

  logout() {
    this.session = null;
  }
}