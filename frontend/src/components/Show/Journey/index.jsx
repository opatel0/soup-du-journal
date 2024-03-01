import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getJourney } from '../../../../utils/backend'

export default function ShowJourney() {
    const [details, setDetails] = useState({})
    const params = useParams()

    useEffect(() => {
        getJourney(params.journeyId)
            .then(journey => setDetails(journey))
    }, [])

    return (
        <>
            <h1>{details.title}</h1>
            <p>{details.description}</p>
        </>
    )
}