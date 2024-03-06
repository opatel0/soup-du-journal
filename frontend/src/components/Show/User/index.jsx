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
            <div className="bg-white mb-4 p-1 rounded-md">
                <p>Username: {details.username}</p>
                <p>Password: {details.password}</p>
                <p>Journey Count: {details.journeys.length}</p>
                <p>Experiences Count: {details.experiences.length}</p>
            </div>
    }

    return (
        <div>
            <h2 className="header text-xl mb-4 md:text-2xl">Account Info</h2>
            {accountEl}
            <div>
                <Link to="/account/edit"><button className="bg-white mr-8 p-4 text-2xl rounded-md">Edit Account</button></Link>
                <button className="bg-white mr-8 p-4 text-2xl rounded-md" onClick={handleDelete}>Delete Account</button>
            </div>
        </div>
    )
}