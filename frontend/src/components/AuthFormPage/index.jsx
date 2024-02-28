import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signUp } from '../../../utils/backend'

export default function Signup() {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const navigate = useNavigate()

    function handleInputChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const { token } = await signUp(formData)
        localStorage.setItem('userToken', token)
        navigate('/dashboard')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="username"
                value={formData.username}
                onChange={handleInputChange}
            />
            <input
                name="password"
                value={formData.password}
                onChange={handleInputChange}
            />
            <button type="submit">Sign Up</button>
        </form>
    )
}