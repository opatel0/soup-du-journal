import { useEffect, useState } from 'react'
import { getDashboard } from '../../../utils/backend'

export default function Dashboard() {
    const [experiences, setExperiences] = useState([])

    useEffect(() => {
        getDashboard()
            .then(experienceData => {setExperiences(experienceData.data)})
    }, [])
    
    let experiencesEl = <p>Loading...</p>
    experiencesEl = experiences.map(experience => {
        let timeCreated = new Date(experience.createdAt)
        let timeUpdated = new Date(experience.updatedAt)
        return (
            <div key={experience._id}>
                <h2>{experience.title}</h2>
                <p>{experience.username}</p>
                <p>{experience.content}</p>
                <p>Created: {timeCreated.toLocaleString()}</p>
                {timeUpdated > timeCreated && <p>Last edited: {timeUpdated.toLocaleString()}</p>}
            </div>
    )}) 

    return (
        <>
            <h1>Dashboard</h1>
            {experiencesEl}
        </>
    )
}