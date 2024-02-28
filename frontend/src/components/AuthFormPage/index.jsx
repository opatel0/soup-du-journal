import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { signUp, logIn } from '../../../utils/backend'

export default function AuthFormPage({ setLoginStatus }) {
    const { formType } = useParams()
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
        if (formType === 'login') {
            const { token } = await logIn(formData)
            localStorage.setItem('userToken', token)
            setLoginStatus(true)
        } else {
            const { token } = await signUp(formData)
            localStorage.setItem('userToken', token)
            setLoginStatus(true)
        }
        navigate('/dashboard')
    }

    let actionText
    formType === 'login' ? actionText = 'Log In' : actionText = 'Sign Up'

    return (
        <>
            <h1>{actionText}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    placeholder="username"
                    value={formData.username}
                    onChange={handleInputChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <button type="submit">{actionText}</button>
            </form>
        </>
    )
}