import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api, { API_URL } from '../api/api';
import { Minus, Plus, Truck, ShieldCheck, RotateCcw, Heart, Share2 } from 'lucide-react';
import { getImageUrl } from '../utils/imageUtils';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(41);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data.product || data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const imageUtil = (path) => getImageUrl(path, API_URL);

    if (loading) return <div style={{ padding: '5rem', textAlign: 'center' }}>Loading premium product...</div>;
    if (!product) return <div style={{ padding: '5rem', textAlign: 'center' }}>Product not found.</div>;

    return (
        <div style={{ padding: '5rem 0', background: '#FFF' }}>
            <div className="container" style={{ maxWidth: '1200px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '6rem', alignItems: 'start' }}>

                    {/* Left: Images FIGMA STYLE - Large & Bold */}
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            {[1, 2, 3].map(i => (
                                <div key={i} style={{ width: '85px', height: '85px', border: '1px solid #F3F4F6', borderRadius: '8px', cursor: 'pointer', overflow: 'hidden', padding: '5px' }}>
                                    <img src={imageUtil(product.image)} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                </div>
                            ))}
                        </div>
                        <div style={{ flex: 1, background: '#FBFBFC', borderRadius: '12px', padding: '3rem', height: '620px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', border: '1px solid #F3F4F6' }}>
                            <img src={imageUtil(product.image)} alt={product.name} style={{ maxWidth: '100%', height: '100%', objectFit: 'contain' }} />
                            <div style={{ position: 'absolute', top: '30px', right: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ background: 'white', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', cursor: 'pointer' }}><Heart size={22} color="#111" /></div>
                                <div style={{ background: 'white', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', cursor: 'pointer' }}><Share2 size={20} color="#111" /></div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Info FIGMA STYLE - Bold UI */}
                    <div style={{ paddingTop: '1rem' }}>
                        <nav style={{ fontSize: '13px', fontWeight: '700', color: '#AAA', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Shop / {product.category?.name || 'Artisan'} / <span style={{ color: '#111' }}>{product.name}</span>
                        </nav>
                        <h1 style={{ fontSize: '3.2rem', fontWeight: '950', color: '#111', marginBottom: '1.5rem', letterSpacing: '-2px', lineHeight: '1' }}>{product.name}</h1>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '2.5rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '950', color: 'var(--primary)' }}>BDT {product.price}</h2>
                            {product.discountPrice && (
                                <span style={{ textDecoration: 'line-through', color: '#CCC', fontSize: '1.5rem', fontWeight: '700' }}>BDT {product.discountPrice}</span>
                            )}
                        </div>

                        <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '3rem', fontSize: '1.15rem' }}>{product.description}</p>

                        <div style={{ marginBottom: '3rem' }}>
                            <p style={{ fontWeight: '900', marginBottom: '1.2rem', fontSize: '14px', color: '#111', letterSpacing: '1px' }}>SELECT SIZE (EU)</p>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                {[39, 40, 41, 42, 43].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        style={{
                                            width: '60px',
                                            height: '60px',
                                            border: '2px solid',
                                            borderColor: selectedSize === size ? 'var(--primary)' : '#F3F4F6',
                                            background: selectedSize === size ? 'var(--primary)' : '#FFF',
                                            color: selectedSize === size ? '#FFF' : '#111',
                                            borderRadius: '12px',
                                            fontWeight: '900',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                        }}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '4rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', border: '2px solid #F3F4F6', padding: '0 25px', borderRadius: '12px' }}>
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><Minus size={20} /></button>
                                <span style={{ minWidth: '40px', textAlign: 'center', fontSize: '1.4rem', fontWeight: '950' }}>{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><Plus size={20} /></button>
                            </div>
                            <button
                                className="btn-primary"
                                onClick={() => {
                                    const existingCart =
                                        JSON.parse(localStorage.getItem('cart')) || [];

                                    existingCart.push(product);

                                    localStorage.setItem(
                                        'cart',
                                        JSON.stringify(existingCart)
                                    );

                                    alert(`${product.name} added to cart`);
                                }}
                            >ADD TO CART</button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', padding: '2rem', background: '#FBFBFC', borderRadius: '12px', border: '1px solid #F3F4F6' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '15px', fontWeight: '800', color: '#333' }}>
                                <ShieldCheck size={22} color="var(--primary)" /> 2-Year Craftsmanship Warranty
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '15px', fontWeight: '800', color: '#333' }}>
                                <Truck size={22} color="var(--primary)" /> Worldwide Premium Shipping
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
