import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import NavigationBar from './components/Navbar';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (token && storedUser) {
            setIsAuthenticated(true);
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user from local storage");
            }
        }
    }, []);

    const setAuth = (boolean) => {
        setIsAuthenticated(boolean);
    };

    return (
        <Router>
            <NavigationBar isAuthenticated={isAuthenticated} setAuth={setAuth} user={user} />
            <div className="container mt-4">
                <Routes>
                    <Route 
                        path="/login" 
                        element={!isAuthenticated ? <Login setAuth={setAuth} setUser={setUser} /> : <Navigate to="/dashboard" />} 
                    />
                    <Route 
                        path="/register" 
                        element={!isAuthenticated ? <Register setAuth={setAuth} setUser={setUser} /> : <Navigate to="/dashboard" />} 
                    />
                    <Route 
                        path="/dashboard" 
                        element={isAuthenticated ? <Dashboard user={user} /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="*" 
                        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} 
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
