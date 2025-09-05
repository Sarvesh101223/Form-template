import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import Careers from './pages/Career';
import Contact from './pages/Contact';
import Feedback from './pages/Feedback';

import './styles/App.css';

function Navigation() {
  const location = useLocation()

  return (
    <nav className='nav-container'>
      <div className='nav-links'>
        <Link to='/' className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
          Home
        </Link>
        <Link to='/careers' className={`nav-link ${location.pathname === '/careers' ? 'active' : ''}`}>
          Careers
        </Link>
        <Link to='/contact' className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
          Contact
        </Link>
        <Link to='/feedback' className={`nav-link ${location.pathname === '/feedback' ? 'active' : ''}`}>
          Feedback
        </Link>
        
      </div>
    </nav>
  )
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />

        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/careers' element={<Careers/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/feedback' element={<Feedback/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
