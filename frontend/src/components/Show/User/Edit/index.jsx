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
        <div className="flex flex-col h-screen w-screen">
            <h2 className="header text-xl mb-4 md:text-2xl">Edit User</h2>
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
                    placeholder="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-3/4 mb-8 text-2xl"
                />
                <button className="bg-white w-2/5 mb-8 p-4 text-2xl rounded-md" type="submit">Edit User</button>
            </form>
        </div>
    )
}