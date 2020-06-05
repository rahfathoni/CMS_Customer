import axios from 'axios'

const server = axios.create({
  baseURL: 'https://mysterious-wave-51576.herokuapp.com'
})

export default server
