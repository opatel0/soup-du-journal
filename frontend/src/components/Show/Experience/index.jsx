import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getExperience, deleteExperience } from '../../../../utils/backend'

export default function ShowExperience(props) {
    const [details, setDetails] = useState({ ...props.details })
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!details._id) {
            getExperience(params.experienceId)
                .then(experience => setDetails(experience))
        }
    }, [])

    function handleDelete() {
        deleteExperience(details._id)
        navigate(`/journey/${details.journeyId}`)
    }

    let timeCreated = new Date(details.createdAt)
    let timeUpdated = new Date(details.updatedAt)
    return (
        <div className="flex flex-col w-3/4 justify-center">
            <h2 className="header mb-4 text-3xl">{details.title}</h2>
            <div className="bg-white mb-4 p-1 rounded-md">
                <p className="text-xl">{details.content}</p><br/>
                <p className="text-sm">Logged by {details.username} in <Link to={`/journey/${details.journeyId}`}><span className="text-lime-600 hover:text-green-500">{details.journeyTitle}</span></Link></p>
                <p className="text-gray-400 text-sm">Created: {timeCreated.toLocaleString()}</p>
                {timeUpdated > timeCreated && <p className="text-gray-400 text-sm">Last edited: {timeUpdated.toLocaleString()}</p>}
            </div>
            <div>
                <Link to={`/experience/${details._id}/edit`}><button className="bg-white mr-8 p-4 text-2xl rounded-md">Edit</button></Link>
                <button onClick={handleDelete} className="bg-white ml-8 p-4 text-2xl rounded-md">Delete</button>
            </div>
        </div>
    )
}