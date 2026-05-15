import { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import api from '../api/api';
import { Plus, Edit, Trash2, X, Loader2 } from 'lucide-react';
import AdminHeader from '../components/AdminHeader';

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const { data } = await api.get('/category');
            setCategories(data.categories || data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (cat = null) => {
        if (cat) {
            setEditingCategory(cat);
            setName(cat.name);
            setDescription(cat.description || '');
        } else {
            setEditingCategory(null);
            setName('');
            setDescription('');
        }
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editingCategory) {
                await api.put(`/category/${editingCategory.id}`, { name, description });
            } else {
                await api.post('/category', { name, description });
            }
            setShowModal(false);
            fetchCategories();
        } catch (error) {
            alert(error.response?.data?.message || 'Operation failed');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this category?')) {
            try {
                await api.delete(`/category/${id}`);
                fetchCategories();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#FBFBFC' }}>
            <AdminSidebar />
            <AdminHeader title="Category Management" />

            <main style={{ marginLeft: '260px', padding: '3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2.2rem', fontWeight: '950', color: '#111', letterSpacing: '-1.5px' }}>Product Categories</h1>
                        <p style={{ color: '#666', fontWeight: '500' }}>Manage artisanal collections and grouping rules.</p>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        style={{
                            background: '#FF4D1C', color: '#FFF', padding: '15px 30px', border: 'none', borderRadius: '8px',
                            fontWeight: '900', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px'
                        }}
                    >
                        <Plus size={18} /> ADD NEW CATEGORY
                    </button>
                </div>

                <div style={{ background: '#FFF', borderRadius: '16px', border: '1px solid #F1F1F1', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#FBFBFC', borderBottom: '1px solid #F1F1F1' }}>
                                <th style={{ padding: '20px', textAlign: 'left', fontSize: '12px', fontWeight: '900', color: '#999', letterSpacing: '1px' }}>CATEGORY NAME</th>
                                <th style={{ padding: '20px', textAlign: 'left', fontSize: '12px', fontWeight: '900', color: '#999', letterSpacing: '1px' }}>SLUG</th>
                                <th style={{ padding: '20px', textAlign: 'right', fontSize: '12px', fontWeight: '900', color: '#999', letterSpacing: '1px' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="3" style={{ padding: '4rem', textAlign: 'center', fontWeight: '800' }}>LOADING DATA...</td></tr>
                            ) : (
                                categories.map((cat) => (
                                    <tr key={cat.id} style={{ borderBottom: '1px solid #F9FAFB' }}>
                                        <td style={{ padding: '20px', fontWeight: '800', color: '#111', fontSize: '15px' }}>{cat.name}</td>
                                        <td style={{ padding: '20px', color: '#666', fontWeight: '600' }}>{cat.slug || cat.name.toLowerCase().replace(' ', '-')}</td>
                                        <td style={{ padding: '20px', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                                                <button onClick={() => handleOpenModal(cat)} style={{ color: '#666', border: 'none', background: 'none', cursor: 'pointer' }}><Edit size={18} /></button>
                                                <button onClick={() => handleDelete(cat.id)} style={{ color: '#EF4444', border: 'none', background: 'none', cursor: 'pointer' }}><Trash2 size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </main>

            {showModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
                    <div style={{ background: 'white', width: '450px', borderRadius: '16px', padding: '3rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '950', letterSpacing: '-1px' }}>{editingCategory ? 'Update Category' : 'Create Category'}</h2>
                            <button onClick={() => setShowModal(false)} style={{ border: 'none', background: '#F1F1F1', color: '#666', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', marginBottom: '10px', color: '#999', letterSpacing: '1px' }}>CATEGORY NAME</label>
                                <input
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Leather Goods"
                                    style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #EEE', background: '#FBFBFC', fontWeight: '700', fontSize: '15px', marginBottom: '1rem' }}
                                />
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', marginBottom: '10px', color: '#999', letterSpacing: '1px' }}>DESCRIPTION</label>
                                <textarea
                                    required
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Brief description of this collection"
                                    rows="3"
                                    style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #EEE', background: '#FBFBFC', fontWeight: '700', fontSize: '15px' }}
                                />
                            </div>
                            <button disabled={submitting} type="submit" style={{ width: '100%', padding: '18px', background: '#000', color: '#FFF', border: 'none', borderRadius: '10px', fontWeight: '900', fontSize: '14px', letterSpacing: '1px', cursor: 'pointer' }}>
                                {submitting ? 'PROCESSING...' : (editingCategory ? 'UPDATE COLLECTION' : 'SAVE CATEGORY')}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCategories;
