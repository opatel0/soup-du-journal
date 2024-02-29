import { useState } from 'react'

export default function CreateExperience() {
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
    return (
        <>
            <h1>Create Experience</h1>
            <form>
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