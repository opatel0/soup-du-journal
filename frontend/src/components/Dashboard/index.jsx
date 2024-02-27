import { useEffect, useState } from 'react'
import { getDashboard } from '../../../utils/backend'

export default function Dashboard() {
    const [experiences, setExperiences] = useState([])

    useEffect(() => {
        getDashboard()
            .then(experienceData => {setExperiences(experienceData.data)})
    }, [])

    let experiencesEl = <p>Loading...</p>
    experiencesEl = experiences.map(experience => (
        <div key={experience._id}>
            <h2>{experience.title}</h2>
            <p>{experience.content}</p>
        </div>
    )) 

    return (
        <>
            <h1>Dashboard</h1>
            {experiencesEl}
        </>
    )
}