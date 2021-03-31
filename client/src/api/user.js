import axios from './axios';

export default {
  async create(data) {
    return axios.put('./user', data);
  }
};