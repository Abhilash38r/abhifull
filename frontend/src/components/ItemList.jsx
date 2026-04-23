const ItemList = ({ items, deleteItem, setEditingItem, currentUser }) => {
    return (
        <div>
            <h4>Reported Items</h4>
            {items.length === 0 ? (
                <p>No items found.</p>
            ) : (
                <div className="row">
                    {items.map(item => (
                        <div key={item._id} className="col-md-6 mb-3">
                            <div className="card shadow-sm h-100">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h5 className="card-title mb-0">{item.itemName}</h5>
                                        <span className={`badge ${item.type === 'Lost' ? 'bg-danger' : 'bg-success'}`}>
                                            {item.type}
                                        </span>
                                    </div>
                                    <p className="card-text text-muted mb-2">{item.description}</p>
                                    <ul className="list-unstyled mb-3">
                                        <li><strong>Location:</strong> {item.location}</li>
                                        <li><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</li>
                                        <li><strong>Contact:</strong> {item.contactInfo}</li>
                                    </ul>
                                    {currentUser && item.user === currentUser.id && (
                                        <div className="d-flex gap-2">
                                            <button 
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => setEditingItem(item)}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => deleteItem(item._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ItemList;
