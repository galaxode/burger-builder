import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burg-builder.firebaseio.com/'
});

export default instance;
