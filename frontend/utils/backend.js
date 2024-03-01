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