import { useState } from 'react'

export default function CreateJourney() {
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
    return (
        <>
            <h1>Create Journey</h1>
            <form>
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