function Home({ onNavigate }) {
  const features = [
    {
      icon: '⚡',
      title: 'Quick & Easy',
      description: 'Book services in just a few clicks with our intuitive platform'
    },
    {
      icon: '🔒',
      title: 'Secure & Reliable',
      description: 'All our service providers are verified and background checked'
    },
    {
      icon: '💰',
      title: 'Best Prices',
      description: 'Competitive pricing with no hidden charges or surprises'
    },
    {
      icon: '⭐',
      title: 'Top Rated',
      description: '4.8+ average rating from thousands of satisfied customers'
    }
  ]

  const popularServices = [
    {
      name: 'Home Cleaning',
      icon: '🧹',
      price: '₹1,500'
    },
    {
      name: 'Plumbing',
      icon: '🔧',
      price: '₹800'
    },
    {
      name: 'Electrical Work',
      icon: '⚡',
      price: '₹1,200'
    },
    {
      name: 'IT Support',
      icon: '💻',
      price: '₹2,000'
    }
  ]

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Your Tasks, 
              <span className="gradient-text"> Our Expertise</span>
            </h1>
            <p className="hero-subtitle">
              TaskNinja connects you with trusted professionals for all your home service needs. 
              From cleaning to repairs, we've got you covered.
            </p>
            <div className="hero-buttons">
              <button 
                className="btn btn-primary btn-large"
                onClick={() => onNavigate('register')}
              >
                Get Started Free
              </button>
              <button 
                className="btn btn-outline btn-large"
                onClick={() => onNavigate('login')}
              >
                I Already Have an Account
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">10,000+</div>
                <div className="stat-label">Happy Customers</div>
              </div>
              <div className="stat">
                <div className="stat-number">500+</div>
                <div className="stat-label">Expert Professionals</div>
              </div>
              <div className="stat">
                <div className="stat-number">50+</div>
                <div className="stat-label">Services Available</div>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="service-cards-preview">
              {popularServices.map((service, index) => (
                <div key={index} className="preview-card" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="preview-icon">{service.icon}</div>
                  <div className="preview-content">
                    <div className="preview-title">{service.name}</div>
                    <div className="preview-price">{service.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose TaskNinja?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Get Things Done?</h2>
            <p className="cta-subtitle">
              Join thousands of satisfied customers who trust TaskNinja for their home service needs.
            </p>
            <button 
              className="btn btn-primary btn-large"
              onClick={() => onNavigate('register')}
            >
              Start Your First Task
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home