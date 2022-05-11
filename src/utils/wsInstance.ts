import axios from 'axios';

export const WEBSOCKET_URL = 'http://localhost:8000';
export const fetcher = (url: string) =>
  wsInstance.get(url).then((response) => response.data);

const wsInstance = axios.create({ baseURL: WEBSOCKET_URL });
export default wsInstance;
