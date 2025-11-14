import { useState } from 'react'

function ServiceView({ service, onNavigate, onBooking }) {
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    address: '',
    notes: ''
  })

  if (!service) {
    return (
      <div className="service-view">
        <div className="container">
          <p>Service not found.</p>
        </div>
      </div>
    )
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    
    if (!bookingData.date || !bookingData.time || !bookingData.address) {
      alert('Please fill in all required fields: date, time, and address.')
      return
    }

    // Call the onBooking function passed from App.jsx
    onBooking(bookingData)
  }

  const handleInputChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    })
  }

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="service-view">
      <div className="container">
        <div className="service-detail">
          <div className="service-detail-image">
            {service.icon}
          </div>
          
          <div className="service-detail-content">
            <h1 className="service-detail-title">{service.name}</h1>
            <div className="service-detail-price">{service.price}</div>
            <p className="service-detail-description">{service.description}</p>
            
            <div className="service-features">
              <h3>Service Includes:</h3>
              <ul className="feature-list">
                <li className="feature-item">Professional service provider</li>
                <li className="feature-item">Quality guaranteed</li>
                <li className="feature-item">All necessary equipment</li>
                <li className="feature-item">Follow-up support</li>
                <li className="feature-item">Satisfaction guarantee</li>
              </ul>
            </div>

            <div className="booking-form">
              <h3 className="form-title">Book This Service</h3>
              <form onSubmit={handleBookingSubmit}>
                <div className="form-group">
                  <label className="form-label">Preferred Date *</label>
                  <input
                    type="date"
                    name="date"
                    className="form-input"
                    value={bookingData.date}
                    onChange={handleInputChange}
                    min={today}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Preferred Time *</label>
                  <input
                    type="time"
                    name="time"
                    className="form-input"
                    value={bookingData.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Service Address *</label>
                  <textarea
                    name="address"
                    className="form-input"
                    placeholder="Enter your complete address"
                    value={bookingData.address}
                    onChange={handleInputChange}
                    required
                    rows="3"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Additional Notes (Optional)</label>
                  <textarea
                    name="notes"
                    className="form-input"
                    placeholder="Any special requirements or notes for the service provider"
                    value={bookingData.notes}
                    onChange={handleInputChange}
                    rows="3"
                  />
                </div>
                
                <div className="booking-summary">
                  <h4>Booking Summary</h4>
                  <div className="summary-item">
                    <span>Service:</span>
                    <span>{service.name}</span>
                  </div>
                  <div className="summary-item">
                    <span>Price:</span>
                    <span>{service.price}</span>
                  </div>
                  <div className="summary-item total">
                    <span>Total:</span>
                    <span>{service.price}</span>
                  </div>
                </div>
                
                <button type="submit" className="btn btn-primary" style={{width: '100%', marginTop: '1rem'}}>
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceView