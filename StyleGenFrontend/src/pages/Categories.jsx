import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api, { API_URL } from '../api/api';
import { getImageUrl } from '../utils/imageUtils';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await api.get('/category');
                setCategories(data.categories || data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const imageUtil = (path) => getImageUrl(path, API_URL);

    const getCatImage = (cat) => {
        const fallbacks = {
            shoes: '/images/categories/shoes.jpg',
            wallet: '/images/categories/wallet.jpg',
            bags: '/images/categories/bags.jpg',
            belt: '/images/categories/belt.jpg',
            loafers: '/images/categories/loafers.jpg',
            tshirt: '/images/categories/tshirt.jpg',
            "t-shirt": '/images/categories/tshirt.jpg',
            "t shirts": '/images/categories/tshirt.jpg',
            "t-shirts": '/images/categories/tshirt.jpg',
        };
        const fallback = fallbacks[cat.name.toLowerCase()];
        if (fallback) return fallback;

        if (cat.image && cat.image.startsWith('http')) return cat.image;
        if (cat.image) return imageUtil(cat.image);

        return '/images/products/shoes.jpg';
    };

    if (loading) return <div style={{ padding: '10rem', textAlign: 'center', fontWeight: '900', color: '#111' }}>LOADING MASTERPIECES...</div>;

    return (
        <div style={{ background: '#FFF', minHeight: '80vh', padding: '6rem 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '950', letterSpacing: '-2px', marginBottom: '1.2rem' }}>Artisan Collections</h1>
                    <p style={{ color: '#666', fontSize: '1.2rem', fontWeight: '500' }}>Explore our handcrafted legacy curated by master artisans</p>
                </div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
                        gap: '2.5rem'
                    }}
                >
                    {categories.map((cat) => {
                        console.log(cat.name);

                        return (
                            <Link
                                to={`/products?category=${cat.name}`}
                                key={cat._id || cat.name}
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    position: 'relative',
                                    height: '480px',
                                    overflow: 'hidden',
                                    borderRadius: '12px',
                                    background: '#000'
                                }}
                            >
                                <img
                                    src={getCatImage(cat)}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        opacity: 0.75,
                                        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                                    }}
                                    alt={cat.name}
                                    onMouseOver={(e) =>
                                        (e.currentTarget.style.transform = 'scale(1.08)')
                                    }
                                    onMouseOut={(e) =>
                                        (e.currentTarget.style.transform = 'scale(1)')
                                    }
                                />

                                <div
                                    style={{
                                        position: 'absolute',
                                        bottom: '2.5rem',
                                        left: '2.5rem',
                                        color: '#FFF'
                                    }}
                                >
                                    <h4
                                        style={{
                                            fontSize: '12px',
                                            fontWeight: '900',
                                            color: 'var(--primary)',
                                            letterSpacing: '1.5px',
                                            marginBottom: '8px'
                                        }}
                                    >
                                        ARTISAN SERIES
                                    </h4>

                                    <h2
                                        style={{
                                            fontSize: '2.8rem',
                                            fontWeight: '950',
                                            margin: 0,
                                            letterSpacing: '-1.5px',
                                            lineHeight: '1'
                                        }}
                                    >
                                        {cat.name}
                                    </h2>

                                    <div
                                        style={{
                                            marginTop: '1.5rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            fontSize: '14px',
                                            fontWeight: '800'
                                        }}
                                    >
                                        VIEW COLLECTION
                                        <span style={{ fontSize: '20px' }}>→</span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Categories;
