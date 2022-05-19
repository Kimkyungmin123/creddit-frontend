import axios from 'axios';

export const fetcher = (url: string) =>
  wsInstance.get(url).then((response) => response.data);

const wsInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WEBSOCKET_URL,
});
export default wsInstance;
