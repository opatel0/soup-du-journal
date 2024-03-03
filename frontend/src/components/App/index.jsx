import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import LandingPage from '../LandingPage'
import AuthFormPage from '../AuthFormPage'
import Dashboard from '../Dashboard'
import IndexJourneys from '../Index/Journeys'
import ShowJourney from '../Show/Journey'
import ShowExperience from '../Show/Experience'
import CreateJourney from '../Create/Journey'
import EditJourney from '../Show/Journey/Edit'
import CreateExperience from '../Create/Experience'
import './styles.css'

export default function App() {
    const [loginStatus, setLoginStatus] = useState(false)
    const [experienceDetails, setExperienceDetails] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('userToken')) {
            setLoginStatus(true)
        }
    }, [])

    let logout
    if (localStorage.length > 0) {
        logout = 
            <a><li 
                className='nav'
                onClick={() => {
                    localStorage.clear()
                    setLoginStatus(false)
                    navigate('/')
            }}>
                Log Out
            </li></a>
    }

    return (
        <>
            {!loginStatus && 
                <Routes>
                    <Route path="/*" element={<LandingPage />} />
                    <Route path="/auth/:formType" element={<AuthFormPage setLoginStatus={setLoginStatus} />} />
                </Routes>
            }
            {loginStatus && 
                <>
                    <nav>
                        <li className="nav"><Link to="/dashboard">Dashboard</Link></li>
                        <li className="nav"><Link to="/journeys">My Journeys</Link></li>
                        {logout}
                    </nav>
                    <Routes>
                        <Route path="/" element={<Dashboard loginStatus={loginStatus} />} />
                        <Route path="/dashboard"element={<Dashboard updateExperienceDetails={setExperienceDetails} />} />
                        <Route path="/auth/:formType" element={<AuthFormPage setLoginStatus={setLoginStatus} />} />
                        <Route path="/journeys" element={<IndexJourneys />} />
                        <Route path="/journey/:journeyId" element={<ShowJourney updateExperienceDetails={setExperienceDetails} />} />
                        <Route path="/experience/:experienceId" element={<ShowExperience details={experienceDetails} />} />
                        <Route path="/createjourney" element={<CreateJourney />} />
                        <Route path="/journey/:journeyId/edit" element={<EditJourney />} />
                        <Route path="/createexperience/:journeyId" element={<CreateExperience updateExperienceDetails={setExperienceDetails} />} />
                    </Routes>
                </>
            }
        </>
    )
}