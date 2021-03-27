import axios from 'axios';

const instance = axios.create({
   baseURL: 'https://us-central1-backend-endpointapi.cloudfunctions.net/api'
            // the API (cloud function) url
});
export default instance ;
//http://localhost:5001/amz-clone-e20bf/us-central1/apic


//http://localhost:5001/amz-clone-e20bf/us-central1/api

