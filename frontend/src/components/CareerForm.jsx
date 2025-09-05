import { useState } from "react"
import '../styles/Form.css';

const CareerForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        skills: '',
        resume: ''
    })

    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.position) {
            setMessage('Please fill in all required fields')
            return;
        }

        setLoading(true)
        setMessage('')

        try {
            const response = await fetch('http://localhost:4000/api/forms/submit/career', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const result = await response.json();

            if (result.success) {
                setMessage(result.message);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    position: '',
                    experience: '',
                    skills: '',
                    resume: ''
                })
            } else {
                setMessage(result.message)
            }

        } catch (e) {
            setMessage('Something went wrong. Please try again')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="form-container fade-in">
            <h2 className="form-title">Join Our Team</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-input"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        disabled={loading}
                    />
                </div>


                <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-input"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Phone number</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="form-input"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 555 123-4567"
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Position</label>
                    <select
                        name="position"
                        id="position"
                        className="form-select"
                        value={formData.position}
                        onChange={handleChange}
                        disabled={loading}
                    >

                        <option value="">Select a position</option>
                        <option value="Frontend Developer">Frontend Developer</option>
                        <option value="Backend Developer">Backend Developer</option>
                        <option value="Full Stack Developer">Full Stack Developer</option>
                        <option value="UI/UX Designer">UI/UX Designer</option>
                        <option value="Product Manager">Product Manager</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Experience</label>
                    <select
                        name="experience"
                        id="experience"
                        className="form-select"
                        value={formData.experience}
                        onChange={handleChange}
                        disabled={loading}
                    >

                        <option value="">Select experience level</option>
                        <option value="0">Entry Level</option>
                        <option value="1-2">1-2 Years</option>
                        <option value="3-5">3-5 Years</option>
                        <option value="5+">5+ Years</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Key Skills</label>
                    <input
                        type="text"
                        id="skills"
                        name="skills"
                        className="form-input"
                        value={formData.skills}
                        onChange={handleChange}
                        placeholder="React, Node.js, Javascript, etc."
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Resume/CV Details</label>
                    <textarea
                        id="resume"
                        name="resume"
                        className="form-textarea"
                        rows="4"
                        value={formData.resume}
                        onChange={handleChange}
                        placeholder="Provide your resume link or breif summary of experience..."
                        disabled={loading}
                    />
                </div>

                <button type="submit" className="form-button" disabled={loading}>
                    {loading ? (
                        <>
                            <span className="loading"></span> Submitting...
                        </>
                    ) : (   
                        'Submit Application'
                    )}
                </button>

                {message && (
                    <div className={`form-message ${message.includes('✅') ? 
                        'form-success' : 'form-error'
                    }`}>
                        {message}
                    </div>
                )}

            </form>
        </div>
    )
}

export default CareerForm
