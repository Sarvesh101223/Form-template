import { useState } from "react"
import '../styles/Feedback.css';

const FeedbackForm = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        rating: 0,
        category: '',
        recommend: '',
        comments: '',
        improvement: ''
    });

    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [hoveredStar, setHoveredStar] = useState(0)

    //Rating labels: 
    const ratingLabels = {
        1: 'Poor',
        2: 'Fair',
        3: 'Good',
        4: 'Very Good',
        5: 'Excellent'
    }

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleStarClick = rating => {
        setFormData({
            ...formData,
            rating: rating
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();

        //Validation:
        if (!formData.name || !formData.email || !formData.rating) {
            setMessage('Please fill in all required fields and provide a rating');
            return;
        }

        if (formData.rating < 1 || formData.rating > 5) {
            setMessage('Please select a rating between 1 and 5 stars')
            return;
        }

        setLoading(true)
        setMessage('')

        try {
            const response = await fetch('http://localhost:4000/api/forms/submit/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const result = await response.json();

            if (result.success) {
                setMessage(result.message || 'Thank you for your feedback')

                setFormData({
                    name: '',
                    email: '',
                    rating: 0,
                    category: '',
                    recommend: '',
                    comments: '',
                    improvement: ''
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
        <div className="feedback-container">
            <h2 className="feedback-title">Share Your Feedback</h2>
            <p className="feedback-subtitle">
                Your opinion matters! Help us improve by sharing your experience.
            </p>

            <form onSubmit={handleSubmit}>

                <div className="feedback-grid">
                    <div className="feedback-group">
                        <label className="feedback-label" htmlFor="name">👤 Your Name *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="feedback-input"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            disabled={loading}
                        />
                    </div>

                    <div className="feedback-group">
                        <label className="feedback-label" htmlFor="email">📧 Your Email *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="feedback-input"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your.email@example.com"
                            disabled={loading}
                        />
                    </div>

                    <div className="rating-section">
                        <label className="feedback-label">Overall Rating</label>

                        <div className="stars-container">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`star ${star <= (hoveredStar || formData.rating) ? 'active' : ''
                                        }`}
                                    onClick={() => handleStarClick(star)}
                                    onMouseEnter={() => setHoveredStar(star)}
                                    onMouseLeave={() => setHoveredStar(0)}
                                >
                                    ⭐
                                </span>
                            ))}
                        </div>

                        {(formData.rating > 0 || hoveredStar > 0) && (
                            <div className="rating-text">
                                {ratingLabels[hoveredStar || formData.rating]}
                            </div>
                        )}

                        <div className="feedback-grid">
                            <div className="feedback-group">
                                <label className="feedback-label" htmlFor="category">Feedback Category</label>
                                <select
                                    id="category"
                                    name="category"
                                    className="feedback-select"
                                    value={formData.category}
                                    onChange={handleChange}
                                    disabled={loading}
                                >
                                    <option value="">Select a category</option>
                                    <option value="User Experience">User Experience</option>
                                    <option value="Performance">Website Performance</option>
                                    <option value="Design">Design & Layout</option>
                                    <option value="Content">Content Quality</option>
                                    <option value="Features">Features & Functionality</option>
                                    <option value="Support">Customer Support</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="feedback-group">
                                <label className="feedback-label" htmlFor="category">Would you recomment us?</label>
                                <select
                                    id="recommend"
                                    name="recommend"
                                    className="feedback-select"
                                    value={formData.recommend}
                                    onChange={handleChange}
                                    disabled={loading}
                                >
                                    <option value="">Select an option</option>
                                    <option value="Definitely">Definitely</option>
                                    <option value="Probably">Probably</option>
                                    <option value="Maybe">Maybe</option>
                                    <option value="Unlikely">Unlikely</option>
                                    <option value="Never">Never</option>
                                </select>
                            </div>

                            <div className="feedback-group">
                                <label className="feedback-label">Your Comments</label>

                                <textarea 
                                    name="comments"
                                    id="comments"
                                    className="feedback-textarea"
                                    rows="4"
                                    value={formData.comments}
                                    onChange={handleChange}
                                    placeholder="Tell us what you liked or what could be improved..."
                                    disabled={loading}
                                />
                            </div>
      
                            <div className="feedback-group">
                                <label className="feedback-label">Your Suggestions</label>

                                <textarea 
                                    name="improvement"
                                    id="improvement"
                                    className="feedback-textarea"
                                    rows="3"
                                    value={formData.improvement}
                                    onChange={handleChange}
                                    placeholder="Any specific suggestions to make our service better?"
                                    disabled={loading}
                                />
                            </div>

                            <button type="submit" className="feedback-button" disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className="loading-spinner"></span> Submitting Feedback...
                                    </>
                                ) : ('Submit Feedback')}
                            </button>


                            {message && (
                                <div className={`feedback-message ${message.includes('✅') ? 
                                    'success' : 'error'
                                }`}>
                                    {message}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </form >

        </div >
    )
}

export default FeedbackForm
