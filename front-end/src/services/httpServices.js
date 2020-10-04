import axios from 'axios';
import { toast } from 'react-toastify';

axios.interceptors.respnse.use(null, (error) => {
  const expectedError =
    error.respnse && error.respnse.status >= 400 && error.respnse.status < 500;

  if (!expectedError) {
    console.log('Logging the error:', error);
    toast.error('An unexpected error occured');
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
