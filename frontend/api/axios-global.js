
import axios from 'axios'

let base_URL=import.meta.env.VITE_BASE_URL;


axios.defaults.baseURL=`${base_URL}/v1`;

axios.defaults.headers.common['Content-Type']="application/json"
// axios.defaults.headers.common['']="application/json"