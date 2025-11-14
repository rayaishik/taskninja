import { useState } from 'react'

function Login({ onLogin, onNavigate }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically make an API call
    console.log('Login attempt:', formData)
    
    // Simulate user data from API response
    const userData = {
      name: formData.email.split('@')[0], // Extract name from email
      email: formData.email
    }
    
    onLogin(userData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Don't have an account? 
            <a 
              href="#" 
              className="auth-link"
              onClick={(e) => { e.preventDefault(); onNavigate('register') }}
            >
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login