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
        <div className="flex flex-col h-screen w-screen">
            <h2 className="header text-xl mb-4 md:text-2xl">Create Journey</h2>
            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                <input
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-3/4 mb-8 text-2xl"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-3/4 mb-8 text-2xl"
                />
                <button className="bg-white w-2/5 mb-8 p-4 text-2xl rounded-md" type="submit">Create Journey</button>
            </form>
        </div>
    )
}