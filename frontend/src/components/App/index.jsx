import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import LandingPage from '../LandingPage'
import AuthFormPage from '../AuthFormPage'
import Dashboard from '../Dashboard'
import ShowUserAccount from '../Show/User'
import EditUserAccount from '../Show/User/Edit'
import IndexJourneys from '../Index/Journeys'
import ShowJourney from '../Show/Journey'
import ShowExperience from '../Show/Experience'
import CreateJourney from '../Create/Journey'
import EditJourney from '../Show/Journey/Edit'
import CreateExperience from '../Create/Experience'
import EditExperience from '../Show/Experience/Edit'
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
                className="nav md:text-xl"
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
                <div className="h-fit w-fit m-4">
                    <nav className="flex flex-col w-full md:justify-between md:flex-row">
                        <li className="nav"><Link to="/dashboard"><h1 className="header">Soup du Journal</h1></Link></li>
                        <div className="flex items-center justify-center">
                            <li className="nav md:text-xl"><Link to="/journeys">My Journeys</Link></li>
                            <li className="nav md:text-xl"><Link to="/account">My Account</Link></li>
                            {logout}
                        </div>
                    </nav>
                    <div className="flex justify-center">
                        <Routes>
                            <Route path="/" element={<Dashboard loginStatus={loginStatus} />} />
                            <Route path="/dashboard"element={<Dashboard updateExperienceDetails={setExperienceDetails} />} />
                            <Route path="/auth/:formType" element={<AuthFormPage setLoginStatus={setLoginStatus} />} />
                            <Route path="/account" element={<ShowUserAccount setLoginStatus={setLoginStatus} />} />
                            <Route path="/account/edit" element={<EditUserAccount />} />
                            <Route path="/journeys" element={<IndexJourneys />} />
                            <Route path="/journey/:journeyId" element={<ShowJourney updateExperienceDetails={setExperienceDetails} />} />
                            <Route path="/createjourney" element={<CreateJourney />} />
                            <Route path="/journey/:journeyId/edit" element={<EditJourney />} />
                            <Route path="/experience/:experienceId" element={<ShowExperience details={experienceDetails} />} />
                            <Route path="/createexperience/:journeyId" element={<CreateExperience updateExperienceDetails={setExperienceDetails} />} />
                            <Route path="/experience/:experienceId/edit" element={<EditExperience />} />
                        </Routes>
                    </div>
                </div>
            }
        </>
    )
}