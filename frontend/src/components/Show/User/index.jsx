import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUser, deleteUser } from '../../../../utils/backend'

export default function ShowJourney({ setLoginStatus }) {
    const [details, setDetails] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getUser()
            .then(info => setDetails(info))
    }, [])

    function handleDelete() {
        deleteUser()
            .then(() => {
                setLoginStatus(false)
                localStorage.clear()
                navigate('/')
        })
    }


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
            <button onClick={handleDelete}>Delete Account</button>
            {accountEl}
        </>
    )
}