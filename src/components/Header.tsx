import { Link } from 'react-router-dom'
import '../styles/Header.css'

function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Your Local Tool</h1>
        <nav className="header-nav">
          <Link to="/" className="nav-link">Home</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
