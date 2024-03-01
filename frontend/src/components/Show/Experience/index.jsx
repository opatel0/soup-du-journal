import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getExperience } from '../../../../utils/backend'

export default function ShowExperience(props) {
    const [details, setDetails] = useState({ ...props.details })
    
    const params = useParams()

    useEffect(() => {
        if (!details._id) {
            getExperience(params.experienceId)
                .then(experience => setDetails(experience))
        }
    }, [])

    let timeCreated = new Date(details.createdAt)
    let timeUpdated = new Date(details.updatedAt)
    return (
        <div>
            <Link to={`/journey/${details.journeyId}`}><h2>Journal: {details.journeyTitle}</h2></Link>
            <h3>{details.title}</h3>
            <p>By: {details.username}</p>
            <p>{details.content}</p>
            <p>Created: {timeCreated.toLocaleString()}</p>
            {timeUpdated > timeCreated && <p>Last edited: {timeUpdated.toLocaleString()}</p>}
        </div>
    )
}