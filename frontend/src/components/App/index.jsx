import { Routes, Route } from 'react-router-dom'
import AuthFormPage from '../AuthFormPage'
import Dashboard from '../Dashboard'

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<AuthFormPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </>
    )
}