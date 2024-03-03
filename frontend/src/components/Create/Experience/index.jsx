import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { createExperience } from '../../../../utils/backend'

export default function CreateExperience({ updateExperienceDetails }) {
    const params = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    })

    function handleInputChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        createExperience(formData, params.journeyId)
            .then(experience => {
                updateExperienceDetails(experience)
                navigate(`/experience/${experience._id}`)
            })
    }

    return (
        <>
            <h1>Create Experience</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleInputChange}
                />
                <textarea
                    name="content"
                    placeholder="Content"
                    value={formData.content}
                    onChange={handleInputChange}
                />
                <button type="submit">Create Experience</button>
            </form>
        </>
    )
}