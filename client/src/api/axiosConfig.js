import axios from 'axios';

export default axios.create({
    baseURL:
        process.env.NODE_ENV === 'development'
            ? process.env.VUE_APP_API_DEV
            : process.env.VUE_APP_API_PROD,
    timeout: 5000,
    withCredentials: true,
});
