import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const Register = ({ setAuth, setUser }) => {
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const { name, email, password } = inputs;

    const onChange = (e) => setInputs({ ...inputs, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = { name, email, password };
            const response = await api.post('/register', body);
            
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            setAuth(true);
            setUser(response.data.user);
        } catch (err) {
            setError(err.response?.data?.msg || 'Server Error');
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card shadow-sm mt-5">
                    <div className="card-body p-4">
                        <h2 className="text-center mb-4">Register</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={onChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <button className="btn btn-primary w-100" type="submit">Register</button>
                        </form>
                        <div className="mt-3 text-center">
                            Already have an account? <Link to="/login">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
