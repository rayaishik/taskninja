import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Services from './pages/Services'
import ServiceView from './pages/ServiceView'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [selectedService, setSelectedService] = useState(null)
  const [bookings, setBookings] = useState([])
  const [completedTasks, setCompletedTasks] = useState(0)
  const [ongoingTasks, setOngoingTasks] = useState(0)

  // Load data from localStorage on app start
  useEffect(() => {
    const savedBookings = localStorage.getItem('taskninja_bookings')
    const savedCompleted = localStorage.getItem('taskninja_completed')
    const savedOngoing = localStorage.getItem('taskninja_ongoing')
    
    if (savedBookings) setBookings(JSON.parse(savedBookings))
    if (savedCompleted) setCompletedTasks(parseInt(savedCompleted))
    if (savedOngoing) setOngoingTasks(parseInt(savedOngoing))
  }, [])

  // Save to localStorage whenever bookings change
  useEffect(() => {
    localStorage.setItem('taskninja_bookings', JSON.stringify(bookings))
    localStorage.setItem('taskninja_completed', completedTasks.toString())
    localStorage.setItem('taskninja_ongoing', ongoingTasks.toString())
  }, [bookings, completedTasks, ongoingTasks])

  const handleLogin = (userData) => {
    setIsLoggedIn(true)
    setUser(userData)
    setCurrentPage('dashboard')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
    setCurrentPage('home')
  }

  const handleServiceSelect = (service) => {
    setSelectedService(service)
    setCurrentPage('service-view')
  }

  const handleBooking = (bookingData) => {
    const newBooking = {
      id: Date.now().toString(),
      service: selectedService,
      ...bookingData,
      status: 'confirmed',
      bookedAt: new Date().toISOString(),
      progress: 'scheduled'
    }
    
    const updatedBookings = [newBooking, ...bookings]
    setBookings(updatedBookings)
    setOngoingTasks(prev => prev + 1)
    
    alert('Booking confirmed successfully!')
    setCurrentPage('dashboard')
  }

  const handleTaskComplete = (taskId) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === taskId 
        ? { ...booking, status: 'completed', progress: 'completed' }
        : booking
    )
    
    setBookings(updatedBookings)
    setOngoingTasks(prev => prev - 1)
    setCompletedTasks(prev => prev + 1)
  }

  const handleTaskCancel = (taskId) => {
    const updatedBookings = bookings.filter(booking => booking.id !== taskId)
    setBookings(updatedBookings)
    setOngoingTasks(prev => prev - 1)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />
      case 'login':
        return <Login onLogin={handleLogin} onNavigate={setCurrentPage} />
      case 'register':
        return <Register onNavigate={setCurrentPage} />
      case 'services':
        return isLoggedIn ? <Services onServiceSelect={handleServiceSelect} /> : <Login onLogin={handleLogin} onNavigate={setCurrentPage} />
      case 'service-view':
        return isLoggedIn ? (
          <ServiceView 
            service={selectedService} 
            onNavigate={setCurrentPage}
            onBooking={handleBooking}
          />
        ) : (
          <Login onLogin={handleLogin} onNavigate={setCurrentPage} />
        )
      case 'dashboard':
      default:
        return isLoggedIn ? (
          <Dashboard 
            user={user} 
            onNavigate={setCurrentPage}
            bookings={bookings}
            completedTasks={completedTasks}
            ongoingTasks={ongoingTasks}
            onTaskComplete={handleTaskComplete}
            onTaskCancel={handleTaskCancel}
          />
        ) : (
          <Login onLogin={handleLogin} onNavigate={setCurrentPage} />
        )
    }
  }

  return (
    <div className="App">
      <Navbar 
        currentPage={currentPage} 
        isLoggedIn={isLoggedIn} 
        onNavigate={setCurrentPage}
        onLogout={handleLogout}
      />
      {renderPage()}
    </div>
  )
}

export default App