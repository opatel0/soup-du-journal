import axios from 'axios'

/* NON-AUTH REQUESTS
------------------------------------------------------------------------ */
export async function getDashboard() {
    const data = await axios.get('/api/experiences')
    return data
}

export async function getExperience(experienceId) {
    const { data }  = await axios.get(`/api/experiences/${experienceId}`)
    return data
}

export async function getJourney(journeyId) {
    const { data } = await axios.get(`/api/journeys/${journeyId}`)
    return data
}

export async function getJourneyExperiences(journeyId) {
    const { data } = await axios.get(`/api/experiences/${journeyId}/journeyexperiences`)
    return data
}


/* AUTHENTICATION REQUESTS
------------------------------------------------------------------------ */
export async function signUp(user) {
    const { data } = await axios.post('/api/users/signup', user)
    return data
}

export async function logIn(user) {
    const { data } = await axios.post('/api/users/login', user)
    return data
}


/* AUTHORIZATION REQUESTS
------------------------------------------------------------------------ */
export async function getUserJourneys() {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') }}
    const { data } = await axios.get('/api/journeys', authHeader)
    return data
}

export async function createJourney(journey) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') }}
    const { data } = await axios.post('/api/journeys', journey, authHeader)
    return data
}

export async function editJourney(journey, journeyId) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') }}
    const { data } = await axios.put(`/api/journeys/${journeyId}`, journey, authHeader)
    return data
}

export async function deleteJourney(journeyId) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') }}
    const { data } = await axios.delete(`/api/journeys/${journeyId}`, authHeader)
    return data
}

export async function createExperience(experience, journeyId) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') }}
    const { data } = await axios.post(`/api/experiences/${journeyId}`, experience, authHeader)
    return data
}

export async function editExperience(experience, experienceId) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') }}
    const { data } = await axios.put(`/api/experiences/${experienceId}`, experience, authHeader)
    return data
}

export async function deleteExperience(experienceId) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') }}
    const { data } = await axios.delete(`/api/experiences/${experienceId}`, authHeader)
    return data
}