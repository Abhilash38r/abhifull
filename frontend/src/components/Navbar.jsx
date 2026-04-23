import { Link, useNavigate } from 'react-router-dom';

const NavigationBar = ({ isAuthenticated, setAuth, user }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuth(false);
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link className="navbar-brand" to="/">Lost & Found System</Link>
                <div className="collapse navbar-collapse justify-content-end">
                    <ul className="navbar-nav">
                        {isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link text-light me-3">Hello, {user?.name}</span>
                                </li>
                                <li className="nav-item">
                                    <button onClick={handleLogout} className="btn btn-light btn-sm mt-1">Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;
