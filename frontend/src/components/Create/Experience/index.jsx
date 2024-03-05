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
        <div className="flex flex-col h-screen w-screen">
            <h2 className="header text-xl mb-4 md:text-2xl">Create Experience</h2>
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
                <button className="bg-white w-2/5 mb-8 p-4 text-2xl rounded-md" type="submit">Create Experience</button>
            </form>
        </div>
    )
}