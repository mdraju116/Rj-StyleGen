import { useState, useEffect } from 'react';
import { useLocation, useSearchParams, Link } from 'react-router-dom';
import api, { API_URL } from '../api/api';
import { Filter, ChevronDown } from 'lucide-react';
import { getImageUrl } from '../utils/imageUtils';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const [searchParams] = useSearchParams();

    // Get category from URL
    const category = searchParams.get('category');

    console.log('Selected category:', category);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products');

                const allProducts = data.products || data;

                setProducts(allProducts);

                // FILTER PRODUCTS
                if (category && category !== 'lookbook') {
                    const filtered = allProducts.filter(
                        (p) =>
                            p.category &&
                            p.category.toLowerCase() ===
                                category.toLowerCase()
                    );

                    setFilteredProducts(filtered);
                } else {
                    setFilteredProducts(allProducts);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    const imageUtil = (path) => getImageUrl(path, API_URL);
    

    return (
        <div style={{ padding: '4rem 0', background: '#FAFAFA', minHeight: '80vh' }}>
            <div className="container">
                {/* PAGE HEADER */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', textTransform: 'capitalize' }}>
                            {category ? `${category} Collection` : 'All Products'}
                        </h1>
                        <p style={{ color: '#666', marginTop: '10px' }}>Showing {filteredProducts.length} results</p>
                    </div>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 20px', background: '#FFF', border: '1px solid #EEE', borderRadius: '4px', fontWeight: '700', cursor: 'pointer' }}>
                            <Filter size={18} /> Filter
                        </button>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 20px', background: '#FFF', border: '1px solid #EEE', borderRadius: '4px', fontWeight: '700', cursor: 'pointer' }}>
                            Sort By <ChevronDown size={18} />
                        </button>
                    </div>
                </div>

                {/* PRODUCT GRID */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '5rem' }}>Loading products...</div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2.5rem' }}>
                        {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                            <div key={product._id} className="card" style={{ padding: '0', border: '1px solid #EEE', borderRadius: '4px', background: '#FFF' }}>
                                <div style={{ position: 'relative', height: '320px', overflow: 'hidden' }}>
                                    <Link to={`/products/${product._id}`}>
                                        <img src={imageUtil(product.image)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={product.name} />
                                    </Link>
                                    {product.discount && <span style={{ position: 'absolute', top: '15px', left: '15px', background: 'var(--primary)', color: 'white', padding: '4px 10px', fontSize: '12px', fontWeight: '900', borderRadius: '2px' }}>-{product.discount}%</span>}
                                </div>
                                <div style={{ padding: '1.5rem' }}>
                                    <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#111', marginBottom: '10px' }}>{product.name}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                                        <span style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--primary)' }}>BDT {product.price}</span>
                                        <span style={{ fontSize: '14px', color: '#AAA', textDecoration: 'line-through' }}>BDT {product.price + 200}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button
                                            className="btn btn-outline"
                                            onClick={() => {
                                                const existingCart =
                                                    JSON.parse(localStorage.getItem('cart')) || [];
                                                    window.dispatchEvent(new Event('storage'));

                                                existingCart.push(product);

                                                localStorage.setItem(
                                                    'cart',
                                                    JSON.stringify(existingCart)
                                                );
                                                window.dispatchEvent(new Event('storage'));

                                                alert(`${product.name} added to cart`);
                                            }}
                                        >ADD TO CART</button>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => alert(`Proceeding to checkout for ${product.name}`)}
                                        >BUY NOW</button>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem', background: '#FFF', border: '1px dotted #CCC' }}>
                                <h3 style={{ fontWeight: '800' }}>No products found in this category.</h3>
                                <p style={{ color: '#999', marginTop: '10px' }}>Try exploring our other premium collections.</p>
                                <Link to="/products" style={{ display: 'inline-block', marginTop: '2rem', color: 'var(--primary)', fontWeight: '800' }}>View All Products</Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};


export default Products;
