import {Link} from 'react-router-dom'
import '../styles/Page.css'

const Home = () => {
  return (
    <div className='page-container'>
        <div className="page-header">
            <h1 className='page-title'>Dynamic forms</h1>
            <p className='page-subtitle'>
                Real-time validation and instant email notifications
            </p>
        </div>

        <div className="card-grid">
            <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3 className="feature-title">Lightning Fast</h3>
                <p className="feature-description">
                    Forms are processed instantly with real-time validation and immediate feedback.
                </p>
            </div>
            
            <div className="feature-card">
                <div className="feature-icon">📧</div>
                <h3 className="feature-title">Smart Emails</h3>
                <p className="feature-description">
                   Automatic email notifications with beautiful templates for each form type.
                </p>
            </div>
            <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3 className="feature-title">Secure & Reliable</h3>
                <p className="feature-description">
                    Your data is protected with enterprise-grade security and validation.
                </p>
            </div>

            <div style={{textAlign: 'center', marginTop: '50px'}}>
                <Link to= "/careers" className='btn btn-primary' style={{marginRight: '20px'}}> 
                    View Careers
                </Link>
                
                <Link to= "/contact" className='btn btn-secondary'> 
                    Contact Us
                </Link>
                
            </div>

        </div>
    </div>
  )
}

export default Home
