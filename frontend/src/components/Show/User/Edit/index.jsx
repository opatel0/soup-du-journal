import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUser, editUser } from '../../../../../utils/backend'

export default function EditUserAccount() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    useEffect(() => {
        getUser()
            .then(user => {
                setFormData({ ...formData, username: user.username, password: user.password })
            })
    }, [])

    function handleInputChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    function handleSubmit(event) {
        event.preventDefault()
        editUser(formData)
            .then(() => navigate('/account'))
    }

    return (
        <>
            <h1>Edit User</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    placeholder="username"
                    value={formData.username}
                    onChange={handleInputChange}
                />
                <input
                    name="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <button type="submit">Edit User</button>
            </form>
        </>
    )
}