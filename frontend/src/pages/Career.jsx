import CareerForm from "../components/CareerForm"
import '../styles/Page.css'

const Careers = () => {
  return (
    <div className="page-container">
    <div className="page-header">
        <h1 className="page-title">Join Our Team</h1>
        <p className="page-subtitle">
            We're looking for talented individuals to help us build amazing products
        </p>
    </div>

    <CareerForm />
    </div>
  )
}

export default Careers
