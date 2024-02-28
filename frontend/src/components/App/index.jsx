import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import LandingPage from '../LandingPage'
import AuthFormPage from '../AuthFormPage'
import Dashboard from '../Dashboard'

export default function App() {
    const [loginStatus, setLoginStatus] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('userToken')) {
            setLoginStatus(true)
        }
    }, [])

    let logout
    if (localStorage.length > 0) {
        logout = 
            <button
                onClick={() => {
                    localStorage.clear()
                    setLoginStatus(false)
                    navigate('/')
                }}>
                Log Out
            </button>
    }

    return (
        <>
            <nav>
                {logout}
            </nav>
            {!loginStatus && 
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/auth/:formType" element={<AuthFormPage setLoginStatus={setLoginStatus} />} />
                </Routes>
            }
            {loginStatus && 
                <Routes>
                    <Route path="/" element={<Dashboard loginStatus={loginStatus} />} />
                    <Route path="/dashboard" element={<Dashboard loginStatus={loginStatus} />} />
                    <Route path="/auth/:formType" element={<AuthFormPage setLoginStatus={setLoginStatus} />} />
                </Routes>
            }
        </>
    )
}