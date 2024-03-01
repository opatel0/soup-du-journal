import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDashboard } from '../../../utils/backend'

export default function Dashboard({ updateExperienceDetails }) {
    const [experiences, setExperiences] = useState([])

    useEffect(() => {
        getDashboard()
            .then(experienceData => {setExperiences(experienceData.data)})
    }, [])
    
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
            <h1>Dashboard</h1>
            {experiencesEl}
        </>
    )
}