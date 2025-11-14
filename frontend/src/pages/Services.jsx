function Services({ onServiceSelect }) {
  const services = [
    {
      id: 1,
      name: 'Home Cleaning',
      description: 'Professional home cleaning service with eco-friendly products',
      price: '₹1,500',
      rating: 4.8,
      reviews: 124,
      icon: '🧹'
    },
    {
      id: 2,
      name: 'Plumbing',
      description: 'Expert plumbing solutions for all your household needs',
      price: '₹800',
      rating: 4.6,
      reviews: 89,
      icon: '🔧'
    },
    {
      id: 3,
      name: 'Electrical Work',
      description: 'Safe and reliable electrical repairs and installations',
      price: '₹1,200',
      rating: 4.9,
      reviews: 67,
      icon: '⚡'
    },
    {
      id: 4,
      name: 'IT Support',
      description: 'Computer repair and technical support at your doorstep',
      price: '₹2,000',
      rating: 4.7,
      reviews: 156,
      icon: '💻'
    },
    {
      id: 5,
      name: 'Painting',
      description: 'Interior and exterior painting with premium quality paints',
      price: '₹3,500',
      rating: 4.5,
      reviews: 78,
      icon: '🎨'
    },
    {
      id: 6,
      name: 'Gardening',
      description: 'Landscaping and garden maintenance services',
      price: '₹1,800',
      rating: 4.4,
      reviews: 45,
      icon: '🌿'
    }
  ]

  return (
    <div className="services-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Our Services</h1>
          <p className="page-subtitle">
            Choose from a wide range of professional services. Quality guaranteed with every booking.
          </p>
        </div>

        <div className="services-grid">
          {services.map(service => (
            <div key={service.id} className="service-card">
              <div className="service-image">
                {service.icon}
              </div>
              <div className="service-content">
                <h3 className="service-title">{service.name}</h3>
                <p className="service-description">{service.description}</p>
                <div className="service-price">{service.price}</div>
                <div className="service-meta">
                  <div className="service-rating">
                    <span className="star">⭐</span>
                    {service.rating} ({service.reviews} reviews)
                  </div>
                </div>
                <button 
                  className="btn btn-primary"
                  onClick={() => onServiceSelect(service)}
                  style={{width: '100%'}}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services