import { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import api, { API_URL } from '../api/api';
import { Plus, Search, Edit, Trash2, Eye, X, Loader2, Upload } from 'lucide-react';
import { getImageUrl } from '../utils/imageUtils';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    const [modalOpen, setModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        discountPrice: '',
        description: '',
        stock: '',
        category: ''
    });

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await api.get('/products');
            setProducts(data.products || data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const { data } = await api.get('/category');
            setCategories(data.categories || data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/products/${id}`);
                setProducts(products.filter(p => p.id !== id));
            } catch (err) {
                alert('Failed to delete product');
            }
        }
    };

    const handleOpenModal = (product = null) => {
        setSelectedFile(null);
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                price: product.price,
                discountPrice: product.discountPrice || '',
                description: product.description,
                stock: product.stock,
                category: product.category?.id || product.category || ''
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: '', price: '', discountPrice: '', description: '', stock: '', category: ''
            });
        }
        setModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (selectedFile) data.append('image', selectedFile);

        try {
            if (editingProduct) {
                await api.put(`/products/${editingProduct.id}`, data);
            } else {
                await api.post('/products', data);
            }
            setModalOpen(false);
            fetchProducts();
        } catch (err) {
            alert('Operation failed');
        } finally {
            setSubmitting(false);
        }
    };

    const imageUtil = (path) => getImageUrl(path, API_URL);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [previewProduct, setPreviewProduct] = useState(null);

    const handleViewProduct = (product) => {
        setPreviewProduct(product);
        setViewModalOpen(true);
    };

    // Pagination Logic
    const safeProducts = Array.isArray(products) ? products : [];
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = safeProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(safeProducts.length / productsPerPage);

    return (
        <div style={{ minHeight: '100vh', background: '#F9FAFB' }}>
            <AdminSidebar />
            <AdminHeader title="Product Management" />

            <main style={{ marginLeft: '260px', padding: '2rem 3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <div>
                        <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#111' }}>Product Catalog</h1>
                        <p style={{ color: '#666' }}>Manage and edit your artisan products collection ({products.length} total).</p>
                    </div>
                    <button onClick={() => handleOpenModal()} style={{ background: '#FF4D1C', color: '#FFF', border: 'none', padding: '12px 25px', borderRadius: '4px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Plus size={20} /> ADD NEW PRODUCT
                    </button>
                </div>

                <div style={{ background: '#FFF', borderRadius: '12px', border: '1px solid #EEE', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #EEE' }}>
                                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#666', fontWeight: '800' }}>PRODUCT</th>
                                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#666', fontWeight: '800' }}>STOCK</th>
                                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#666', fontWeight: '800' }}>PRICE</th>
                                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#666', fontWeight: '800' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="4" style={{ padding: '3rem', textAlign: 'center' }}>Loading...</td></tr>
                            ) : (
                                currentProducts.map((product) => (
                                    <tr key={product.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                                        <td style={{ padding: '15px 20px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <img src={imageUtil(product.image)} alt="" style={{ width: '45px', height: '45px', borderRadius: '8px', objectFit: 'cover' }} />
                                                <div>
                                                    <p style={{ fontWeight: '800', margin: 0 }}>{product.name}</p>
                                                    <p style={{ fontSize: '11px', color: '#999', margin: 0 }}>SKU: SG-{String(product.id).padStart(5, '0')}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '15px 20px', fontWeight: '700' }}>{product.stock} in stock</td>
                                        <td style={{ padding: '15px 20px', fontWeight: '900' }}>BDT {product.price}</td>
                                        <td style={{ padding: '15px 20px' }}>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <button onClick={() => handleViewProduct(product)} style={{ color: '#666', border: 'none', background: 'none', cursor: 'pointer' }}><Eye size={18} /></button>
                                                <button onClick={() => handleOpenModal(product)} style={{ color: '#666', border: 'none', background: 'none', cursor: 'pointer' }}><Edit size={18} /></button>
                                                <button onClick={() => handleDelete(product.id)} style={{ color: '#EF4444', border: 'none', background: 'none', cursor: 'pointer' }}><Trash2 size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '2.5rem' }}>
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} style={{ padding: '8px 15px', background: '#FFF', border: '1px solid #EEE', borderRadius: '6px', cursor: 'pointer', fontWeight: '700' }}>PREV</button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button key={i} onClick={() => setCurrentPage(i + 1)} style={{ width: '35px', height: '35px', borderRadius: '6px', border: 'none', background: currentPage === i + 1 ? '#FF4D1C' : '#FFF', color: currentPage === i + 1 ? '#FFF' : '#111', fontWeight: '800', cursor: 'pointer', border: '1px solid #EEE' }}>{i + 1}</button>
                        ))}
                        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} style={{ padding: '8px 15px', background: '#FFF', border: '1px solid #EEE', borderRadius: '6px', cursor: 'pointer', fontWeight: '700' }}>NEXT</button>
                    </div>
                )}

                {/* VIEW MODAL */}
                {viewModalOpen && previewProduct && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
                        <div style={{ background: 'white', width: '850px', borderRadius: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden' }}>
                            <div style={{ background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                                <img src={imageUtil(previewProduct.image)} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="" />
                            </div>
                            <div style={{ padding: '3rem', position: 'relative' }}>
                                <button onClick={() => setViewModalOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', border: 'none', background: '#F3F4F6', borderRadius: '50%', padding: '8px', cursor: 'pointer' }}><X size={20} /></button>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: '950', marginBottom: '1rem' }}>{previewProduct.name}</h2>
                                <p style={{ color: '#FF4D1C', fontSize: '1.5rem', fontWeight: '900', marginBottom: '2rem' }}>BDT {previewProduct.price}</p>
                                <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '2rem' }}>{previewProduct.description}</p>
                                <div style={{ background: '#FBFBFC', padding: '1.5rem', borderRadius: '12px', border: '1px solid #F1F1F1' }}>
                                    <p style={{ fontSize: '14px', fontWeight: '800' }}>Inventory: {previewProduct.stock} Units</p>
                                    <p style={{ fontSize: '14px', fontWeight: '800', marginTop: '5px' }}>Category: {previewProduct.category?.name || 'Luxury'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* EDIT/ADD MODAL */}
                {modalOpen && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                        <div style={{ background: 'white', width: '600px', borderRadius: '12px', padding: '2.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                                <h2 style={{ fontWeight: '900' }}>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
                                <button onClick={() => setModalOpen(false)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={24} /></button>
                            </div>
                            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', marginBottom: '5px' }}>Name</label>
                                    <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #EEE' }} />
                                </div>
                                <input required type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #EEE' }} />
                                <input required type="number" placeholder="Stock" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #EEE' }} />
                                <select required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #EEE' }}>
                                    <option value="">Category</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                                <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
                                <textarea placeholder="Description" rows="3" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} style={{ width: '100%', gridColumn: 'span 2', padding: '12px', borderRadius: '8px', border: '1px solid #EEE' }}></textarea>
                                <button type="submit" disabled={submitting} style={{ gridColumn: 'span 2', padding: '15px', background: '#FF4D1C', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '900', cursor: 'pointer' }}>
                                    {submitting ? 'Processing...' : (editingProduct ? 'Update Product' : 'Add Product')}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminProducts;
