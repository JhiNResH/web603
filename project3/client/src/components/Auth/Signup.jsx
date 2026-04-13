import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (!form.confirm) e.confirm = 'Please confirm your password';
    else if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    return e;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    setLoading(true);
    setServerError('');
    try {
      await signup(form.name, form.email, form.password);
    } catch (err) {
      setServerError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card card">
        <div className="card-body p-4">
          <h2 className="card-title text-center mb-4">Create Account</h2>

          {serverError && (
            <div className="alert alert-danger py-2">{serverError}</div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min 6 characters"
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Confirm Password</label>
              <input
                type="password"
                className={`form-control ${errors.confirm ? 'is-invalid' : ''}`}
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                placeholder="Repeat password"
              />
              {errors.confirm && <div className="invalid-feedback">{errors.confirm}</div>}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 py-2"
              disabled={loading}
            >
              {loading ? (
                <><span className="spinner-border spinner-border-sm me-2" />Creating...</>
              ) : 'Create Account'}
            </button>
          </form>

          <p className="text-center mt-3 mb-0 text-muted">
            Already have an account?{' '}
            <Link to="/login" className="fw-semibold">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
