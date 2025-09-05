import FeedbackForm from "../components/FeedbackForm"
import '../styles/Page.css'

const Feedback = () => {
    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">⭐ Your Feedback Matters</h1>
                <p className="page-subtitle">
                    Help us improve by sharing your thoughts and experiences with our service
                </p>
            </div>

            <FeedbackForm />

            {/* Additional Information */}
            <div style={{
                maxWidth: '800px',
                margin: '40px auto 0',
                textAlign: 'center',
                background: 'rgba(255,255,255,0.9)',
                padding: '30px',
                borderRadius: '15px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
            }}>
                <h3 style={{ color: '#333', marginBottom: '20px' }}>
                    🙏 Why Your Feedback is Important
                </h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '20px',
                    marginTop: '20px'
                }}>
                    <div>
                        <div style={{ fontSize: '32px', marginBottom: '10px' }}>🎯</div>
                        <h4 style={{ color: '#667eea', marginBottom: '5px' }}>Better Experience</h4>
                        <p style={{ color: '#666', fontSize: '14px' }}>
                            Your input helps us create a better user experience
                        </p>
                    </div>
                    <div>
                        <div style={{ fontSize: '32px', marginBottom: '10px' }}>🚀</div>
                        <h4 style={{ color: '#667eea', marginBottom: '5px' }}>New Features</h4>
                        <p style={{ color: '#666', fontSize: '14px' }}>
                            Suggestions drive our feature development roadmap
                        </p>
                    </div>
                    <div>
                        <div style={{ fontSize: '32px', marginBottom: '10px' }}>🤝</div>
                        <h4 style={{ color: '#667eea', marginBottom: '5px' }}>Community Driven</h4>
                        <p style={{ color: '#666', fontSize: '14px' }}>
                            We build what our community needs and wants
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feedback
