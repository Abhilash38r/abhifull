import { useState, useEffect } from 'react';
import api from '../api/axios';

const ItemForm = ({ fetchItems, editingItem, setEditingItem }) => {
    const [formData, setFormData] = useState({
        itemName: '',
        description: '',
        type: 'Lost',
        location: '',
        contactInfo: ''
    });

    useEffect(() => {
        if (editingItem) {
            setFormData({
                itemName: editingItem.itemName,
                description: editingItem.description,
                type: editingItem.type,
                location: editingItem.location,
                contactInfo: editingItem.contactInfo
            });
        } else {
            setFormData({
                itemName: '',
                description: '',
                type: 'Lost',
                location: '',
                contactInfo: ''
            });
        }
    }, [editingItem]);

    const { itemName, description, type, location, contactInfo } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            if (editingItem) {
                await api.put(`/items/${editingItem._id}`, formData);
                setEditingItem(null);
            } else {
                await api.post('/items', formData);
            }
            setFormData({
                itemName: '',
                description: '',
                type: 'Lost',
                location: '',
                contactInfo: ''
            });
            fetchItems();
        } catch (err) {
            console.error('Error submitting form', err);
            alert(err.response?.data?.msg || 'Error submitting item');
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label className="form-label">Item Name</label>
                <input type="text" className="form-control" name="itemName" value={itemName} onChange={onChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" name="description" value={description} onChange={onChange} required></textarea>
            </div>
            <div className="mb-3">
                <label className="form-label">Type</label>
                <select className="form-select" name="type" value={type} onChange={onChange}>
                    <option value="Lost">Lost</option>
                    <option value="Found">Found</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Location</label>
                <input type="text" className="form-control" name="location" value={location} onChange={onChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Contact Info</label>
                <input type="text" className="form-control" name="contactInfo" value={contactInfo} onChange={onChange} required />
            </div>
            <button type="submit" className="btn btn-primary w-100">
                {editingItem ? 'Update Item' : 'Add Item'}
            </button>
            {editingItem && (
                <button 
                    type="button" 
                    className="btn btn-secondary w-100 mt-2" 
                    onClick={() => setEditingItem(null)}
                >
                    Cancel
                </button>
            )}
        </form>
    );
};

export default ItemForm;
