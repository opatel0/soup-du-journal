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
            <div key={journey._id}>
                <Link to={`/journey/${journey._id}`}><h2>{journey.title}</h2></Link>
                <p>{journey.description}</p>
            </div>
    )})

    return (
        <>
            <h1>My Journeys</h1>
            <Link to="/createjourney"><button>Create Journey</button></Link>
            {journeysEl}
        </>
    )
}