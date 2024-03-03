import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getJourney, editJourney } from '../../../../../utils/backend'

export default function EditJourney() {
    const navigate = useNavigate()
    const params = useParams()
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    })

    useEffect(() => {
        getJourney(params.journeyId)
            .then(journey => {
                setFormData({ ...formData, title: journey.title, description: journey.description })
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
        editJourney(formData, params.journeyId)
            .then(journey => navigate(`/journey/${journey._id}`))
    }

    return (
        <>
            <h1>Edit Journey</h1>
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
                <button type="submit">Edit Journey</button>
            </form>
        </>
    )
}