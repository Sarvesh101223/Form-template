import ContactForm from "../components/ContactForm"
import '../styles/Page.css'

const Contact = () => {
  return (
    <div className="page-container">
        <div className="page-header">
            <h1 className="page-title">Get In Touch</h1>
            <p className="page-subtitle">
                Have a project in mind? Let's discuss how we can help bring it to life!
            </p>
        </div>

        <ContactForm />
    </div>
  )
}

export default Contact
