import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { login, user } = useAuth();
    const navigate = useNavigate();

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            navigate(user.role === 'admin' ? '/admin' : '/dashboard');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Login attempt for:", email);
        setError('');
        setSubmitting(true);
        try {
            const result = await login(email, password);
            console.log("Login result:", result);
            if (result.success) {
                const target = result.user.role === 'admin' ? '/admin' : '/dashboard';
                console.log("Navigating to:", target);
                navigate(target);
            } else {
                setError(result.message);
            }
        } catch (err) {
            console.error("Login component error:", err);
            setError('Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '90vh', alignItems: 'center', justifyContent: 'center', background: '#FAFAFA' }}>
            <div style={{ background: '#FFF', padding: '3.5rem', borderRadius: '12px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', width: '100%', maxWidth: '480px' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{ background: 'var(--primary)', color: 'white', width: '50px', height: '50px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '1.5rem', fontWeight: '900' }}>S</div>
                    <h2 style={{ fontSize: '2rem', fontWeight: '900', color: '#111', marginBottom: '0.8rem', letterSpacing: '-1px' }}>Welcome back</h2>
                    <p style={{ color: '#666', fontSize: '15px' }}>Enter your credentials to access your portal</p>
                </div>

                {error && <div style={{ background: '#FEF2F2', color: '#EF4444', padding: '14px', borderRadius: '8px', marginBottom: '2rem', fontSize: '14px', textAlign: 'center', fontWeight: '700', border: '1px solid #FEE2E2' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', fontWeight: '800', color: '#333' }}>EMAIL ADDRESS</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="e.g. admin@stylegen.com"
                            required
                            disabled={submitting}
                            style={{
                                width: '100%', padding: '15px', border: '1px solid #EEE', borderRadius: '8px',
                                outline: 'none', background: '#F9FAFB', fontSize: '15px',
                                transition: '0.3s'
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', fontWeight: '800', color: '#333' }}>PASSWORD</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            disabled={submitting}
                            style={{
                                width: '100%', padding: '15px', border: '1px solid #EEE', borderRadius: '8px',
                                outline: 'none', background: '#F9FAFB', fontSize: '15px',
                                transition: '0.3s'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-0.5rem' }}>
                        <Link to="#" style={{ fontSize: '14px', color: 'var(--primary)', fontWeight: '800' }}>Forgot password?</Link>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="btn btn-primary"
                        style={{
                            width: '100%', padding: '18px', fontWeight: '900',
                            fontSize: '1rem', marginTop: '1rem', borderRadius: '8px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
                        }}
                    >
                        {submitting ? <Loader2 className="animate-spin" size={20} /> : 'SIGN IN'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '15px', color: '#666' }}>
                    New to StyleGen? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '900' }}>Join as artisan</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
