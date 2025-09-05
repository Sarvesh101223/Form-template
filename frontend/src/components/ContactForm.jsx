import { useState } from "react";
import '../styles/Form.css'

const ContactForm = () => {

    //State for form data:
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    })

    //State for messages:
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    //Handle input changes:
    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    //Handle form submission:
    const handleSubmit = async e => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            setMessage('Please fill in all required fields')
            return;
        }

        setLoading(true)
        setMessage('');

        try {
            const response = await fetch('http://localhost:4000/api/forms/submit/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const result = await response.json();

            if (result.success) {
                setMessage(result.message)

                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
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
            <h2 className="form-title">Contact Us</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="name">Name</label>
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
                    <label className="form-label" htmlFor="email">Email</label>
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
                    <label className="form-label" htmlFor="phone">Phone</label>
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
                    <label className="form-label" htmlFor="subject">Subject</label>
                    <select
                        id="subject"
                        name="subject"
                        className="form-select"
                        value={formData.subject}
                        onChange={handleChange}
                        disabled={loading}
                    >
                        <option value="">Choose a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Mobile App">Mobile App</option>
                        <option value="Support">Technical Support</option>
                        <option value="Partnership">Partnership</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        className="form-textarea"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project or inquiry..."
                        disabled={loading} 
                    />
                </div>

                <button type="submit" className="form-button" disabled={loading}>
                    {loading ? (
                        <>
                            <span className="loading"></span> Sending...
                        </>
                    ) : (
                        'Send Message'
                    )}
                </button>

                {message && (
                    <div className={`form-message ${message.includes('✅') ? 'forom-success' : 'form-error'}`}>
                        {message}
                    </div>
                )}

            </form>
        </div>
    )
}

export default ContactForm;