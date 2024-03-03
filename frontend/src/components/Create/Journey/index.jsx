import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createJourney } from '../../../../utils/backend'

export default function CreateJourney() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    })

    function handleInputChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        createJourney(formData)
            .then(journey => navigate(`/journey/${journey._id}`))
    }

    return (
        <>
            <h1>Create Journey</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleInputChange}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                />
                <button type="submit">Create Journey</button>
            </form>
        </>
    )
}