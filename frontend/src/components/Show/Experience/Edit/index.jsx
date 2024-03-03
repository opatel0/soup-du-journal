import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getExperience, editExperience } from '../../../../../utils/backend'

export default function EditExperience() {
    const navigate = useNavigate()
    const params = useParams()
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    })

    useEffect(() => {
        getExperience(params.experienceId)
            .then(experience => {
                setFormData({ ...formData, title: experience.title, content: experience.content })
            })
    }, [])

    function handleInputChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        editExperience(formData, params.experienceId)
            .then(async experience => navigate(`/experience/${experience._id}`))
    }

    return (
        <>
            <h1>Edit Experience</h1>
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
                <button type="submit">Edit Experience</button>
            </form>
        </>
    )
}