import { Routes, Route } from 'react-router-dom'
import AuthFormPage from '../AuthFormPage'
import Dashboard from '../Dashboard'

export default function App() {
    return (
        <>
            <nav>
                <button
                    onClick={() => {
                        localStorage.clear()
                    }}>
                    Log Out
                </button>
            </nav>
            <Routes>
                <Route path="/:formType" element={<AuthFormPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </>
    )
}