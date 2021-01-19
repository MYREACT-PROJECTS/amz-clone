import axios from 'axios';

const instance = axios.create({
   baseURL: 'http://localhost:5001/amz-clone-e20bf/us-central1/api'// the API (cloud function) url
});
export default instance ;