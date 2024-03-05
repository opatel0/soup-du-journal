import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDashboard } from '../../../utils/backend'

export default function Dashboard({ updateExperienceDetails }) {
    const [experiences, setExperiences] = useState([])

    useEffect(() => {
        getDashboard()
            .then(experienceData => {setExperiences(experienceData.data.reverse())})
    }, [])
    
    let experiencesEl = <p>Loading...</p>
    experiencesEl = experiences.map(experience => {
        let timeCreated = new Date(experience.createdAt)
        return (
            <div key={experience._id} className="bg-white mb-4 p-1 rounded-md">
                <Link to={`/experience/${experience._id}`} onClick={() => updateExperienceDetails(experience)}><h3 className="font-bold text-lg">{experience.title}</h3></Link>
                <p>{experience.content}</p>
                <p className="text-gray-400 text-sm">Created: {timeCreated.toLocaleString()}</p>
            </div>
    )}) 

    return (
        <div className="flex flex-col w-3/4 justify-center">
            <h2 className="header text-xl mb-4 md:text-2xl">Public Feed</h2>
            {experiencesEl}
        </div>
    )
}