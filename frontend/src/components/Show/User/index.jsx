import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getUser } from '../../../../utils/backend'

export default function ShowJourney() {
    const [details, setDetails] = useState({})

    useEffect(() => {
        getUser()
            .then(info => setDetails(info))
    }, [])

    let accountEl
    if (details.username) {
        accountEl =
            <>
                <p>Username: {details.username}</p>
                <p>Password: {details.password}</p>
                <p>Journey Count: {details.journeys.length}</p>
                <p>Experiences Count: {details.experiences.length}</p>
            </>
    }

    return (
        <>
            <h1>Account Info</h1>
            <Link to="/account/edit"><button>Edit Account</button></Link>
            {accountEl}
        </>
    )
}