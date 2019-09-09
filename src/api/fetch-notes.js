import axios from 'axios';

export default axios.create({
  baseURL: 'https://mynote-46be7.firebaseio.com'
});
//  for json-server  baseURL: 'http://localhost:3005'
