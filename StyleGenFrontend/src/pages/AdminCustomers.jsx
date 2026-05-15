import { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import api from '../api/api';
import { User, Mail, Calendar, Search } from 'lucide-react';

const AdminCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const { data } = await api.get('/users');
                setCustomers(data.users || data.data || (Array.isArray(data) ? data : []));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCustomers();
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: '#F9FAFB' }}>
            <AdminSidebar />
            <AdminHeader title="User Management" />

            <main style={{ marginLeft: '260px', padding: '2rem 3rem' }}>
                <header style={{ marginBottom: '2.5rem' }}>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#111' }}>Users</h1>
                    <p style={{ color: '#666', marginTop: '5px' }}>View and manage all registered users.</p>
                </header>

                <div style={{ background: '#FFF', borderRadius: '12px', border: '1px solid #EEE' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #EEE' }}>
                                <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '13px' }}>USER</th>
                                <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '13px' }}>EMAIL</th>
                                <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '13px' }}>ROLE</th>
                                <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '13px' }}>JOINED</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="4" style={{ padding: '3rem', textAlign: 'center' }}>Loading...</td></tr>
                            ) : (
                                customers.map((customer) => (
                                    <tr key={customer.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                                        <td style={{ padding: '15px 20px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{ width: '35px', height: '35px', background: '#F3F4F6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <User size={18} color="#666" />
                                                </div>
                                                <span style={{ fontWeight: '700' }}>{customer.name}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '15px 20px', color: '#666' }}>{customer.email}</td>
                                        <td style={{ padding: '15px 20px' }}>
                                            <span style={{ background: customer.role === 'admin' ? '#EEF2FF' : '#F3F4F6', color: customer.role === 'admin' ? '#4F46E5' : '#666', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '800' }}>
                                                {customer.role.toUpperCase()}
                                            </span>
                                        </td>
                                        <td style={{ padding: '15px 20px', color: '#999', fontSize: '13px' }}>
                                            {new Date(customer.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default AdminCustomers;
