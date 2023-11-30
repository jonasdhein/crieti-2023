import axios from 'axios';

const apiPix = axios.create({
    baseURL: 'http://177.44.248.24/pix-api',
    timeout: 600
})

export default apiPix;