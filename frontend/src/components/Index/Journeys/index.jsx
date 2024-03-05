import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getUserJourneys } from '../../../../utils/backend'

export default function IndexJourneys() {
    const [details, setDetails] = useState([])

    useEffect(() => {
        getUserJourneys()
            .then(journeys => setDetails(journeys))
    }, [])

    let journeysEl = <p>Loading...</p>
    journeysEl = details.map(journey => {
        return (
            <div key={journey._id} className=" w-full bg-white mb-4 p-1 rounded-md">
                <Link to={`/journey/${journey._id}`}><h3 className="font-bold text-lg">{journey.title}</h3></Link>
                <p>{journey.description}</p>
            </div>
    )})

    return (
        <div className="flex flex-col w-3/4 justify-center items-center">
            <h2 className="header text-xl mb-4 md:text-2xl">My Journeys</h2>
            <Link to="/createjourney"><button className="bg-white mt-8 mb-4 p-4 text-2xl rounded-md">Create Journey</button></Link>
            {journeysEl}
        </div>
    )
}