import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';

const AdminDashboard = () => {
    const stats = [
        { label: 'Total Customers', value: '1,284', grow: '+12%', color: '#4F46E5' },
        { label: 'Total Products', value: '422', grow: '+4%', color: '#10B981' },
        { label: 'Total Sales', value: 'BDT 84,200', grow: '+18%', color: '#F59E0B' },
        { label: 'Pending Orders', value: '23', grow: '-2%', color: '#EF4444' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#F9FAFB' }}>
            <AdminSidebar />
            <AdminHeader title="Dashboard Overview" />

            <main style={{ marginLeft: '260px', padding: '2rem 3rem' }}>
                <div style={{ marginBottom: '2.5rem' }}>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#111' }}>Dashboard Overview</h1>
                    <p style={{ color: '#666', marginTop: '5px' }}>Welcome back! Here's what's happening with your store today.</p>
                </div>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                    {stats.map((stat) => (
                        <div key={stat.label} style={{ background: '#FFF', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #EEE' }}>
                            <p style={{ fontSize: '14px', color: '#666', fontWeight: '600', marginBottom: '8px' }}>{stat.label}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111' }}>{stat.value}</h2>
                                <span style={{ fontSize: '12px', fontWeight: '700', color: stat.grow.startsWith('+') ? '#10B981' : '#EF4444', background: stat.grow.startsWith('+') ? '#ECFDF5' : '#FEF2F2', padding: '2px 8px', borderRadius: '20px' }}>
                                    {stat.grow}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Activity Mock */}
                <div style={{ background: '#FFF', borderRadius: '12px', border: '1px solid #EEE', overflow: 'hidden' }}>
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid #EEE', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontWeight: '800' }}>Recent Orders</h3>
                        <button style={{ color: 'var(--primary)', fontWeight: '700', border: 'none', background: 'none' }}>View All</button>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: '#F9FAFB' }}>
                                <th style={{ padding: '12px 20px', fontSize: '13px', color: '#666' }}>ORDER ID</th>
                                <th style={{ padding: '12px 20px', fontSize: '13px', color: '#666' }}>CUSTOMER</th>
                                <th style={{ padding: '12px 20px', fontSize: '13px', color: '#666' }}>STATUS</th>
                                <th style={{ padding: '12px 20px', fontSize: '13px', color: '#666' }}>AMOUNT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3].map(i => (
                                <tr key={i} style={{ borderBottom: '1px solid #F3F4F6' }}>
                                    <td style={{ padding: '15px 20px', fontWeight: '600' }}>#5021{i}</td>
                                    <td style={{ padding: '15px 20px' }}>Customer {i}</td>
                                    <td style={{ padding: '15px 20px' }}>
                                        <span style={{ background: '#E0F2FE', color: '#0369A1', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>Processing</span>
                                    </td>
                                    <td style={{ padding: '15px 20px', fontWeight: '700' }}>BDT 1200</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
