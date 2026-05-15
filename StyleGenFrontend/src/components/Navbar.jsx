import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const { user, logout } = useAuth();

    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const updateCartCount = () => {
            const cart =
                JSON.parse(localStorage.getItem('cart')) || [];

            setCartCount(cart.length);
        };

        updateCartCount();

        window.addEventListener('storage', updateCartCount);

        return () => {
            window.removeEventListener(
                'storage',
                updateCartCount
            );
        };
    }, []);

    return (
        <nav
            style={{
                background: '#FFF',
                borderBottom: '1px solid #EEE',
                padding: '1.5rem 0',
                position: 'sticky',
                top: 0,
                zIndex: 1000
            }}
        >
            <div
                className="container"
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                {/* LOGO */}
                <Link
                    to="/"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        textDecoration: 'none'
                    }}
                >
                    <div
                        style={{
                            width: '32px',
                            height: '32px',
                            background: '#FF4D1C',
                            borderRadius: '3px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: '900',
                            fontSize: '1.2rem'
                        }}
                    >
                        S
                    </div>

                    <span
                        style={{
                            fontSize: '1.3rem',
                            fontWeight: '900',
                            color: '#000',
                            letterSpacing: '-1.5px'
                        }}
                    >
                        StyleGen
                    </span>
                </Link>

                {/* MENU */}
                <div style={{ display: 'flex', gap: '30px' }}>
                    <Link
                        to="/products"
                        style={{
                            fontSize: '11px',
                            fontWeight: '800',
                            color: '#111',
                            textDecoration: 'none',
                            letterSpacing: '1px'
                        }}
                    >
                        PRODUCTS
                    </Link>

                    <Link
                        to="/categories"
                        style={{
                            fontSize: '11px',
                            fontWeight: '800',
                            color: '#111',
                            textDecoration: 'none',
                            letterSpacing: '1px'
                        }}
                    >
                        CATEGORIES
                    </Link>
                </div>

                {/* RIGHT SIDE */}
                <div
                    style={{
                        display: 'flex',
                        gap: '20px',
                        alignItems: 'center'
                    }}
                >
                    <Search size={18} style={{ cursor: 'pointer' }} />

                    <Heart size={18} style={{ cursor: 'pointer' }} />

                    {/* CART */}
                    <Link
                        to="/cart"
                        style={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            color: '#000'
                        }}
                    >
                        <ShoppingCart size={18} />

                        <span
                            style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-8px',
                                background: '#000',
                                color: 'white',
                                fontSize: '8px',
                                width: '16px',
                                height: '16px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: '900'
                            }}
                        >
                            {cartCount}
                        </span>
                    </Link>

                    {/* AUTH */}
                    {user ? (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                                marginLeft: '10px'
                            }}
                        >
                            <Link
                                to={
                                    user.role === 'admin'
                                        ? '/admin'
                                        : '/dashboard'
                                }
                            >
                                <div
                                    style={{
                                        width: '28px',
                                        height: '28px',
                                        background: '#F3F4F6',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <User size={15} color="#000" />
                                </div>
                            </Link>

                            <span
                                onClick={logout}
                                style={{
                                    fontSize: '10px',
                                    fontWeight: '900',
                                    cursor: 'pointer',
                                    color: '#666'
                                }}
                            >
                                LOGOUT
                            </span>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            style={{
                                fontWeight: '900',
                                fontSize: '11px',
                                color: '#111',
                                textDecoration: 'none'
                            }}
                        >
                            LOG IN
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;