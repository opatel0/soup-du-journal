import axios from 'axios'

export async function getDashboard() {
    const data = await axios.get('/api/experiences')
    return data
}

export async function signUp(user) {
    const { data } = await axios.post('/api/users/signup', user)
    return data
}

export async function logIn(user) {
    const { data } = await axios.post('/api/users/login', user)
    return data
}

export async function getExperience(experienceId) {
    const { data }  = await axios.get(`/api/experiences/${experienceId}`)
    return data
}