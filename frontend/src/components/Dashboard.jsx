import { useState, useEffect } from 'react';
import api from '../api/axios';
import ItemForm from './ItemForm';
import ItemList from './ItemList';

const Dashboard = ({ user }) => {
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editingItem, setEditingItem] = useState(null);

    const fetchItems = async () => {
        try {
            const response = await api.get('/items');
            setItems(response.data);
        } catch (err) {
            console.error('Error fetching items', err);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            fetchItems();
            return;
        }
        try {
            const response = await api.get(`/items/search?name=${searchQuery}`);
            setItems(response.data);
        } catch (err) {
            console.error('Error searching items', err);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const deleteItem = async (id) => {
        try {
            await api.delete(`/items/${id}`);
            setItems(items.filter(item => item._id !== id));
        } catch (err) {
            console.error('Error deleting item', err);
            alert(err.response?.data?.msg || 'Error deleting item');
        }
    };

    return (
        <div>
            <h2 className="mb-4">Welcome, {user?.name}</h2>
            
            <div className="row mb-4">
                <div className="col-md-6">
                    <form onSubmit={handleSearch} className="d-flex">
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="Search items by name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="btn btn-outline-primary">Search</button>
                        <button 
                            type="button" 
                            className="btn btn-outline-secondary ms-2"
                            onClick={() => {
                                setSearchQuery('');
                                fetchItems();
                            }}
                        >
                            Clear
                        </button>
                    </form>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h4 className="card-title">{editingItem ? 'Edit Item' : 'Report Item'}</h4>
                            <ItemForm 
                                fetchItems={fetchItems} 
                                editingItem={editingItem} 
                                setEditingItem={setEditingItem} 
                            />
                        </div>
                    </div>
                </div>
                
                <div className="col-md-8">
                    <ItemList 
                        items={items} 
                        deleteItem={deleteItem} 
                        setEditingItem={setEditingItem} 
                        currentUser={user}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
