import axios from 'axios';

const APIDATA = axios.create({
  baseURL: 'http://www.boredapi.com/api/activity/'
})

export default APIDATA