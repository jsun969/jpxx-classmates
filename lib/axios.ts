import axios from 'axios';

const server = axios.create({ baseURL: '/api' });

export default server;
