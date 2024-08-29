import React, { useState } from 'react';
import './App.css';

// Sample spa services
const services = [
  { id: 1, name: 'Swedish Massage', duration: 60, price: 100 },
  { id: 2, name: 'Aromatherapy Massage', duration: 90, price: 120 },
  { id: 3, name: 'Hot Stone Massage', duration: 75, price: 130 },
  { id: 4, name: 'Facial Treatment', duration: 50, price: 80 },
  { id: 5, name: 'Body Scrub', duration: 45, price: 70 },
  { id: 6, name: 'Manicure', duration: 40, price: 50 },
  { id: 7, name: 'Pedicure', duration: 50, price: 60 },
  { id: 8, name: 'Hair Treatment', duration: 90, price: 150 },
];

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [loginUser, setLoginUser] = useState({ username: '', password: '' });
  const [selectedService, setSelectedService] = useState(null);
  const [bookingDate, setBookingDate] = useState('');

  const handleRegister = () => {
    setRegisteredUsers([...registeredUsers, newUser]);
    setNewUser({ username: '', password: '' });
    setCurrentView('login');
  };

  const handleLogin = () => {
    const user = registeredUsers.find(
      (user) => user.username === loginUser.username && user.password === loginUser.password
    );
    if (user) {
      setLoggedInUser(user);
      setCurrentView('services');
    } else {
      alert('Invalid username or password');
    }
  };

  const handleBooking = () => {
    if (selectedService && bookingDate) {
      setBookings([...bookings, { service: selectedService, date: bookingDate, user: loggedInUser.username }]);
      setSelectedService(null);
      setBookingDate('');
      alert('Service booked successfully!');
    } else {
      alert('Please select a service and date.');
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Spa Salon</h1>
        <nav>
          <button onClick={() => setCurrentView('home')}>Home</button>
          {loggedInUser ? (
            <>
              <button onClick={() => setCurrentView('services')}>Services</button>
              <button onClick={() => setCurrentView('bookings')}>My Bookings</button>
              <button onClick={() => setLoggedInUser(null)}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => setCurrentView('register')}>Register</button>
              <button onClick={() => setCurrentView('login')}>Login</button>
            </>
          )}
        </nav>
      </header>
      <main>
        {currentView === 'home' && (
          <div>
            <h2>Welcome to Our Spa Salon</h2>
            <p>Relax, rejuvenate, and renew at our luxurious spa salon. Choose from a variety of services to pamper yourself.</p>
          </div>
        )}

        {currentView === 'register' && (
          <div className="register">
            <h2>Register</h2>
            <input
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <button onClick={handleRegister}>Register</button>
          </div>
        )}

        {currentView === 'login' && (
          <div className="login">
            <h2>Login</h2>
            <input
              type="text"
              placeholder="Username"
              value={loginUser.username}
              onChange={(e) => setLoginUser({ ...loginUser, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginUser.password}
              onChange={(e) => setLoginUser({ ...loginUser, password: e.target.value })}
            />
            <button onClick={handleLogin}>Login</button>
          </div>
        )}

        {currentView === 'services' && (
          <div className="services">
            <h2>Services</h2>
            <ul>
              {services.map((service) => (
                <li key={service.id} onClick={() => setSelectedService(service)}>
                  {service.name} - ${service.price} ({service.duration} min)
                </li>
              ))}
            </ul>
            {selectedService && (
              <div className="booking-form">
                <h3>Book {selectedService.name}</h3>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                />
                <button onClick={handleBooking}>Book Now</button>
              </div>
            )}
          </div>
        )}

        {currentView === 'bookings' && (
          <div className="bookings">
            <h2>My Bookings</h2>
            <ul>
              {bookings
                .filter((booking) => booking.user === loggedInUser.username)
                .map((booking, index) => (
                  <li key={index}>
                    {booking.service.name} on {booking.date}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </main>
      <footer>
        <p>&copy; 2024 Spa Salon. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;