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
        <div className="flex flex-col h-screen w-screen">
            <h2 className="header text-xl mb-4 md:text-2xl">Edit Experience</h2>
            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                <input
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-3/4 mb-8 text-2xl"
                />
                <textarea
                    name="content"
                    placeholder="Content"
                    value={formData.content}
                    onChange={handleInputChange}
                    className="w-3/4 mb-8 text-2xl"
                />
                <button className="bg-white w-2/5 mb-8 p-4 text-2xl rounded-md" type="submit">Edit Experience</button>
            </form>
        </div>
    )
}