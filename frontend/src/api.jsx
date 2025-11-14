// API configuration and functions
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Generic API request function
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body)
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'API request failed')
    }

    return data
  } catch (error) {
    console.error('API request error:', error)
    throw error
  }
}

// Auth API functions
export const authAPI = {
  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: credentials,
  }),
  
  register: (userData) => apiRequest('/auth/register', {
    method: 'POST',
    body: userData,
  }),
  
  logout: () => apiRequest('/auth/logout', {
    method: 'POST',
  }),
}

// Services API functions
export const servicesAPI = {
  getAll: () => apiRequest('/services'),
  
  getById: (id) => apiRequest(`/services/${id}`),
  
  create: (serviceData) => apiRequest('/services', {
    method: 'POST',
    body: serviceData,
  }),
}

// Bookings API functions
export const bookingsAPI = {
  getAll: () => apiRequest('/bookings'),
  
  getById: (id) => apiRequest(`/bookings/${id}`),
  
  create: (bookingData) => apiRequest('/bookings', {
    method: 'POST',
    body: bookingData,
  }),
  
  update: (id, bookingData) => apiRequest(`/bookings/${id}`, {
    method: 'PUT',
    body: bookingData,
  }),
  
  delete: (id) => apiRequest(`/bookings/${id}`, {
    method: 'DELETE',
  }),
}

export default apiRequest