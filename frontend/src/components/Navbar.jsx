function Navbar({ currentPage, isLoggedIn, onNavigate, onLogout }) {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); onNavigate('home') }}>
            <span className="logo-icon">⚡</span>
            TaskNinja
          </a>
          
          <ul className="nav-links">
            {!isLoggedIn && (
              <li>
                <a 
                  href="#" 
                  className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); onNavigate('home') }}
                >
                  Home
                </a>
              </li>
            )}
            {isLoggedIn && (
              <>
                <li>
                  <a 
                    href="#" 
                    className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); onNavigate('dashboard') }}
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className={`nav-link ${currentPage === 'services' ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); onNavigate('services') }}
                  >
                    Services
                  </a>
                </li>
              </>
            )}
          </ul>

          <div className="auth-buttons">
            {isLoggedIn ? (
              <button className="btn btn-outline" onClick={onLogout}>
                Logout
              </button>
            ) : (
              <>
                <button 
                  className="btn btn-outline"
                  onClick={() => onNavigate('login')}
                >
                  Login
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => onNavigate('register')}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar