import axios from 'axios';
import config from './config';

const axiosInstance = axios.create(config);

export default axiosInstance;