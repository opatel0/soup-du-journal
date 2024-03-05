import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { signUp, logIn } from '../../../utils/backend'
import './styles.css'

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
        <div className="flex flex-col h-screen w-screen justify-center">
            <h1 className="header mb-8">Soup du Journal</h1>
            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                <input
                    name="username"
                    placeholder="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-3/4 mb-8 text-2xl"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-3/4 mb-8 text-2xl"
                />
                <button className="bg-white w-2/5 mb-8 p-4 text-2xl rounded-md" type="submit">{actionText}</button>
            </form>
        </div>
    )
}