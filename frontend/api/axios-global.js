
import axios from 'axios'

let base_URL=import.meta.env.VITE_BASE_URL;


axios.defaults.baseURL=`${base_URL}/v1`;
axios.defaults.headers.common['Content-Type']="application/json"
// axios.defaults.withCredentials=true;


// interceptors to check the error in response is authorized or not
// axios.interceptors.response.use((res)=> res,
//     (error)=> {
//         console.log('form interceptor');
//         console.log(error)
//     }
// )