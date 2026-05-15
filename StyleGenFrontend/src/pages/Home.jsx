import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api, { API_URL } from '../api/api';
import { ShieldCheck } from 'lucide-react';
import { getImageUrl } from '../utils/imageUtils';

const Home = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.role === 'admin') {
            navigate('/admin');
        }
    }, [user, navigate]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products');
                setProducts(data.products || data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const imageUtil = (path) => getImageUrl(path, API_URL);

    const categories = [
        { name: 'Shoes', img: '/images/categories/shoes.jpg' },
        { name: 'Wallet', img: '/images/categories/wallet.jpg' },
        { name: 'Bags', img: '/images/categories/bags.jpg' },
        { name: 'Belt', img: '/images/categories/belt.jpg' },
        { name: 'Loafers', img: '/images/categories/loafers.jpg' }
    ];

    return (
        <div className="fade-in" style={{ background: '#FFF' }}>

            {/* HERO SECTION */}
            <section
                style={{
                    height: '550px',
                    background:
                        '#111 url("https://www.transparenttextures.com/patterns/dark-matter.png")',
                    overflow: 'hidden',
                    display: 'flex',
                    margin: '1.5rem 2rem',
                    borderRadius: '4px'
                }}
            >
                <div
                    style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: '0 5%'
                    }}
                >
                    <div style={{ textAlign: 'left' }}>
                        <p
                            style={{
                                color: 'var(--primary)',
                                fontWeight: '800',
                                marginBottom: '1rem',
                                fontSize: '14px'
                            }}
                        >
                            ঈদ আয়োজনে
                        </p>

                        <h1
                            style={{
                                fontSize: '4.5rem',
                                fontWeight: '900',
                                color: '#FFF',
                                lineHeight: '1',
                                marginBottom: '1.5rem'
                            }}
                        >
                            স্টাইলে থাকুন
                            <br />

                            <span
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '15px'
                                }}
                            >
                                শুধুই

                                <div
                                    style={{
                                        border: '3px solid #FFF',
                                        padding: '5px 15px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            background: 'var(--primary)'
                                        }}
                                    ></div>

                                    <span
                                        style={{
                                            fontSize: '2.5rem',
                                            letterSpacing: '-2px'
                                        }}
                                    >
                                        StyleGen
                                    </span>
                                </div>
                            </span>
                        </h1>

                        <p
                            style={{
                                color: 'rgba(255,255,255,0.6)',
                                maxWidth: '400px',
                                fontSize: '14px',
                                lineHeight: '1.6'
                            }}
                        >
                            Premium handcrafted leather goods for the modern
                            professional.
                        </p>

                        <Link to="/products">
                            <button
                                className="btn btn-primary"
                                style={{
                                    marginTop: '2.5rem',
                                    padding: '15px 40px'
                                }}
                            >
                                SHOP NOW
                            </button>
                        </Link>
                    </div>
                </div>

                <div style={{ flex: 1.2, display: 'flex', height: '100%' }}>
                    <div
                        style={{
                            flex: 1,
                            height: '100%',
                            clipPath:
                                'polygon(25% 0, 100% 0, 75% 100%, 0% 100%)',
                            transform: 'translateX(30px)'
                        }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                            alt=""
                        />
                    </div>

                    <div
                        style={{
                            flex: 1,
                            height: '100%',
                            clipPath:
                                'polygon(25% 0, 100% 0, 75% 100%, 0% 100%)',
                            zIndex: 2
                        }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                            alt=""
                        />
                    </div>

                    <div
                        style={{
                            flex: 1,
                            height: '100%',
                            clipPath:
                                'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)',
                            transform: 'translateX(-30px)'
                        }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                            alt=""
                        />
                    </div>
                </div>
            </section>

            {/* CATEGORIES */}
            <section style={{ padding: '4rem 0' }}>
                <div className="container">

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '2.5rem'
                        }}
                    >
                        <h2
                            style={{
                                fontSize: '13px',
                                fontWeight: '800',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}
                        >
                            Shop by category
                        </h2>

                        <Link
                            to="/products"
                            style={{
                                color: 'var(--primary)',
                                fontSize: '12px',
                                fontWeight: '800',
                                textDecoration: 'none'
                            }}
                        >
                            View All Categories →
                        </Link>
                    </div>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(5, 1fr)',
                            gap: '1rem'
                        }}
                    >
                        {categories.map((cat) => (
                            <Link
                                key={cat.name}
                                to={`/products?category=${encodeURIComponent(
                                    cat.name
                                )}`}
                                style={{
                                    textAlign: 'center',
                                    textDecoration: 'none',
                                    color: 'inherit'
                                }}
                            >
                                <div
                                    style={{
                                        height: '300px',
                                        background: '#F9FAFB',
                                        borderRadius: '2px',
                                        overflow: 'hidden',
                                        marginBottom: '1rem',
                                        border: '1px solid #EEE'
                                    }}
                                >
                                    <img
                                        src={cat.img}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                        alt={cat.name}
                                    />
                                </div>

                                <span
                                    style={{
                                        fontSize: '12px',
                                        fontWeight: '700',
                                        color: '#111'
                                    }}
                                >
                                    {cat.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURED PRODUCTS */}
            <section style={{ padding: '4rem 0' }}>
                <div className="container">

                    <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                        <h2
                            style={{
                                fontSize: '13px',
                                fontWeight: '800',
                                textTransform: 'uppercase',
                                letterSpacing: '2px'
                            }}
                        >
                            Featured Products
                        </h2>

                        <div
                            style={{
                                width: '40px',
                                height: '2px',
                                background: 'var(--primary)',
                                margin: '15px auto'
                            }}
                        ></div>
                    </div>

                    {loading ? (
                        <div style={{ textAlign: 'center' }}>
                            Loading products...
                        </div>
                    ) : (
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(5, 1fr)',
                                gap: '1rem'
                            }}
                        >
                            {products.slice(0, 5).map((product) => (
                                <div
                                    key={product._id}
                                    className="card"
                                    style={{
                                        background: '#FFF',
                                        border: '1px solid #F3F4F6',
                                        borderRadius: '4px'
                                    }}
                                >
                                    <Link to={`/products/${product._id}`}>
                                        <div
                                            style={{
                                                position: 'relative',
                                                height: '280px',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            <img
                                                src={imageUtil(product.image)}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }}
                                                alt={product.name}
                                            />

                                            <span
                                                style={{
                                                    position: 'absolute',
                                                    top: '10px',
                                                    left: '10px',
                                                    background: '#FF4D1C',
                                                    color: 'white',
                                                    padding: '3px 7px',
                                                    fontSize: '10px',
                                                    fontWeight: '900'
                                                }}
                                            >
                                                Featured
                                            </span>
                                        </div>
                                    </Link>

                                    <div style={{ padding: '1rem' }}>
                                        <h3
                                            style={{
                                                fontSize: '13px',
                                                fontWeight: '800',
                                                marginBottom: '5px',
                                                height: '40px',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            {product.name}
                                        </h3>

                                        <div style={{ marginBottom: '1rem' }}>
                                            <span
                                                style={{
                                                    color: '#FF4D1C',
                                                    fontWeight: '900',
                                                    fontSize: '14px'
                                                }}
                                            >
                                                BDT {product.price}
                                            </span>
                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '5px'
                                            }}
                                        >
                                            <button
                                                onClick={() => {
                                                    const existingCart =
                                                        JSON.parse(localStorage.getItem('cart')) || [];

                                                    existingCart.push(product);

                                                    localStorage.setItem(
                                                        'cart',
                                                        JSON.stringify(existingCart)
                                                    );
                                                    window.dispatchEvent(new Event('storage'));


                                                    alert(`${product.name} added to cart`);
                                                }}
                                                style={{
                                                    padding: '8px',
                                                    border: '1px solid #EEE',
                                                    background: '#FFF',
                                                    fontSize: '10px',
                                                    fontWeight: '900',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                ADD TO CART
                                            </button>

                                            <button
                                                className="btn-primary"
                                               onClick={() => navigate('/checkout')}
                                                style={{
                                                    padding: '8px',
                                                    border: 'none',
                                                    fontSize: '10px',
                                                    fontWeight: '900',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                BUY NOW
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CRAFTSMANSHIP */}
            <section style={{ padding: '4rem 0' }}>
                <div className="container">
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1.7fr 1fr',
                            gap: '1.5rem'
                        }}
                    >
                        <div
                            style={{
                                position: 'relative',
                                height: '550px',
                                background: '#000',
                                borderRadius: '4px',
                                overflow: 'hidden'
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1473188588955-719548761567?auto=format&fit=crop&w=1200"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    opacity: 0.6
                                }}
                                alt=""
                            />

                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: '3rem',
                                    left: '3rem',
                                    color: '#FFF'
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: '12px',
                                        fontWeight: '700',
                                        marginBottom: '0.5rem'
                                    }}
                                >
                                    Our Craftsmanship
                                </p>

                                <h2
                                    style={{
                                        fontSize: '2.5rem',
                                        fontWeight: '900',
                                        marginBottom: '1rem',
                                        width: '300px',
                                        lineHeight: '1.1'
                                    }}
                                >
                                    Made by master artisans
                                </h2>
                            </div>
                        </div>

                        <div
                            style={{
                                background: '#FF4D1C',
                                borderRadius: '4px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                padding: '2.5rem',
                                textAlign: 'center'
                            }}
                        >
                            <ShieldCheck
                                size={40}
                                style={{ marginBottom: '1.2rem' }}
                            />

                            <h3
                                style={{
                                    fontSize: '1.2rem',
                                    fontWeight: '900',
                                    marginBottom: '0.8rem'
                                }}
                            >
                                Lifetime Warranty
                            </h3>

                            <p
                                style={{
                                    fontSize: '12px',
                                    opacity: 0.9,
                                    lineHeight: '1.6'
                                }}
                            >
                                We stand by the quality of our products.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;