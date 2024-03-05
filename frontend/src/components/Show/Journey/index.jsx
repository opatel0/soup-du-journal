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
            <div className="bg-white mb-4 p-1 rounded-md" key={experience._id}>
                <Link to={`/experience/${experience._id}`} onClick={() => updateExperienceDetails(experience)}><h3 className="font-bold text-lg">{experience.title}</h3></Link>
                <p>{experience.content}</p>
                <p className="text-gray-400 text-sm">Created: {timeCreated.toLocaleString()}</p>
            </div>
    )}) 

    return (
        <div>
            <h2 className="header text-xl mb-4 md:text-2xl">{details.title}</h2>
            <Link to={`/journey/${details._id}/edit`}><button className="bg-white mb-4 mr-1 p-1 text-lg rounded-md">Edit Journey</button></Link>
            <button className="bg-white p-1 text-lg rounded-md" onClick={handleDelete}>Delete Journey</button>
            <p>{details.description}</p>
            <h2 className="header text-xl mb-4 md:text-2xl">Experiences</h2>
            <Link to={`/createexperience/${details._id}`}><button className="bg-white mb-8 p-4 text-2xl rounded-md">Create Experience</button></Link>
            {experiencesEl}
        </div>
    )
}