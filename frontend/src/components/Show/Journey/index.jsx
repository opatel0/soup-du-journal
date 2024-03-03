import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getJourneyExperiences, getJourney, deleteJourney } from '../../../../utils/backend'

export default function ShowJourney({ updateExperienceDetails }) {
    const [details, setDetails] = useState({})
    const [experiences, setExperiences] = useState([])
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getJourney(params.journeyId)
            .then(journey => setDetails(journey))
        getJourneyExperiences(params.journeyId)
            .then(experienceList => setExperiences(experienceList))
    }, [])

    function handleDelete() {
        deleteJourney(params.journeyId)
            .then(() => navigate('/journeys'))
    }

    let experiencesEl = <p>Loading...</p>
    experiencesEl = experiences.map(experience => {
        let timeCreated = new Date(experience.createdAt)
        return (
            <div key={experience._id}>
                <Link to={`/experience/${experience._id}`} onClick={() => updateExperienceDetails(experience)}><h3>{experience.title}</h3></Link>
                <p>{experience.content}</p>
                <p>Created: {timeCreated.toLocaleString()}</p>
            </div>
    )}) 

    return (
        <>
            <h1>{details.title}</h1>
            <p>{details.description}</p>
            <Link to={`/journey/${details._id}/edit`}><button>Edit Journey</button></Link>
            <button onClick={handleDelete}>Delete Journey</button>
            <Link to={`/createexperience/${details._id}`}><button>Create Experience</button></Link>
            {experiencesEl}
        </>
    )
}