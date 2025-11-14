function Dashboard({ user, onNavigate, bookings, completedTasks, ongoingTasks, onTaskComplete, onTaskCancel }) {
  const userData = user || { name: 'User' }

  const stats = [
    { value: completedTasks.toString(), label: 'Tasks Completed', icon: '✅' },
    { value: ongoingTasks.toString(), label: 'Ongoing Tasks', icon: '🔄' }
  ]

  const recentTasks = bookings.slice(0, 4) // Show only latest 4 tasks

  const quickActions = [
    { 
      title: 'Book New Service', 
      description: 'Find professionals for your next task',
      icon: '➕',
      action: () => onNavigate('services')
    },
    { 
      title: 'My Bookings', 
      description: 'View all your scheduled services',
      icon: '📅',
      action: () => alert('My Bookings clicked')
    },
    { 
      title: 'Payment History', 
      description: 'Check your past transactions',
      icon: '💳',
      action: () => alert('Payment History clicked')
    },
    { 
      title: 'Service Providers', 
      description: 'Browse trusted professionals',
      icon: '👨‍💼',
      action: () => alert('Service Providers clicked')
    }
  ]

  const getStatusColor = (status, progress) => {
    if (status === 'completed') return 'var(--success-color)'
    if (progress === 'in-progress') return 'var(--warning-color)'
    if (progress === 'scheduled') return 'var(--primary-color)'
    return 'var(--gray-color)'
  }

  const getStatusText = (status, progress) => {
    if (status === 'completed') return 'Completed'
    if (progress === 'in-progress') return 'In Progress'
    if (progress === 'scheduled') return 'Scheduled'
    return 'Pending'
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Today'
    if (diffDays === 2) return 'Yesterday'
    if (diffDays <= 7) return `${diffDays - 1} days ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="dashboard">
      <div className="container">
        {/* Welcome Header */}
        <div className="dashboard-header">
          <div className="welcome-section">
            <h1 className="dashboard-title">Welcome back, {userData.name}! 👋</h1>
            <p className="dashboard-subtitle">Here's what's happening with your tasks today</p>
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => onNavigate('services')}
          >
            🛎️ Book New Service
          </button>
        </div>

        {/* Stats Overview */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-header">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="dashboard-content">
          {/* Recent Tasks Section */}
          <div className="tasks-section">
            <div className="section-header">
              <h2 className="section-title">Recent Tasks</h2>
              {bookings.length > 0 && (
                <button className="btn-text">View All</button>
              )}
            </div>
            <div className="tasks-list">
              {recentTasks.length > 0 ? (
                recentTasks.map((task) => (
                  <div key={task.id} className="task-card">
                    <div className="task-icon">{task.service.icon}</div>
                    <div className="task-content">
                      <div className="task-header">
                        <h3 className="task-title">{task.service.name}</h3>
                        <div className="task-price">{task.service.price}</div>
                      </div>
                      <p className="task-provider">
                        Scheduled for: {task.date} at {task.time}
                      </p>
                      <div className="task-footer">
                        <span 
                          className="task-status"
                          style={{ color: getStatusColor(task.status, task.progress) }}
                        >
                          {getStatusText(task.status, task.progress)}
                        </span>
                        <span className="task-time">{formatDate(task.bookedAt)}</span>
                      </div>
                    </div>
                    <div className="task-actions">
                      {task.status !== 'completed' && (
                        <>
                          <button 
                            className="btn-complete"
                            onClick={() => onTaskComplete(task.id)}
                          >
                            Mark Complete
                          </button>
                          <button 
                            className="btn-cancel"
                            onClick={() => onTaskCancel(task.id)}
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {task.status === 'completed' && (
                        <button className="task-action">
                          View Details
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">📋</div>
                  <h3 className="empty-title">No tasks yet</h3>
                  <p className="empty-description">
                    You haven't booked any services yet. Start by booking your first task!
                  </p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => onNavigate('services')}
                  >
                    Book Your First Service
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="sidebar-section">
            <div className="quick-actions-card">
              <h3 className="section-title">Quick Actions</h3>
              <div className="actions-list">
                {quickActions.map((action, index) => (
                  <div 
                    key={index} 
                    className="action-item"
                    onClick={action.action}
                  >
                    <div className="action-icon">{action.icon}</div>
                    <div className="action-content">
                      <div className="action-title">{action.title}</div>
                      <div className="action-description">{action.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Summary */}
            {bookings.length > 0 && (
              <div className="stats-summary-card">
                <h3 className="section-title">Tasks Summary</h3>
                <div className="summary-stats">
                  <div className="summary-stat">
                    <span className="summary-label">Total Bookings:</span>
                    <span className="summary-value">{bookings.length}</span>
                  </div>
                  <div className="summary-stat">
                    <span className="summary-label">Completed:</span>
                    <span className="summary-value completed">{completedTasks}</span>
                  </div>
                  <div className="summary-stat">
                    <span className="summary-label">Ongoing:</span>
                    <span className="summary-value ongoing">{ongoingTasks}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard