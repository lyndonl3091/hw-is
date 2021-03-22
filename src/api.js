import axios from 'axios'

const key = process.env.REACT_APP_API_KEY
const url = `https://api.pipedrive.com/api/v1/persons`

const headers = {
    "Accept": "application/json",
    'Content-Type': 'application/json'
  }

export  const getAllPersons = () => axios({
    method: 'get',
    url: `${url}?api_token=${key}`,
    headers
})

export const addPerson = data => axios({
    method: 'post',
    url: `${url}?api_token=${key}`,
    data
})

export const updatePerson = (id, data) => axios({
    method: 'put',
    url: `${url}/${id}?api_token=${key}`,
    data
})