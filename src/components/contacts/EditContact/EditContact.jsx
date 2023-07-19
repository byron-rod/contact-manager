import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';

const EditContact = () => {
  const { contactId } = useParams();
  const { state, updateContact } = useStore();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    const contact = state.contacts.find((contact) => contact.id === parseInt(contactId));
    if (contact) {
      setFormData({
        fullName: contact.first_name + ' ' + contact.last_name,
        email: contact.email,
        phone: contact.phone,
        address: contact.address,
      });
    }
  }, [state.contacts, contactId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateContact(contactId, {
      first_name: formData.fullName.split(' ')[0],
      last_name: formData.fullName.split(' ')[1],
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
    });
    navigate('/contacts/list');
  };

  return (
    <>
      <section className="edit-contact">
      <div className="container">
                <div className="row">
                    <div className="col text-center p-3">
                        <p className="h3 text-success fw-bold">Edit Contact</p>
                    </div>
                </div>
            </div>
      </section>
      <div className="row justify-content-center m-4">
        <div className="col-md-4">
          <form onSubmit={handleSubmit}>
            <h6>Full Name</h6>
            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange} 
              />
            </div>
            <h6>Email</h6>
            <div className="mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange} 
              />
            </div>
            <h6>Phone</h6>
            <div className="mb-2">
              <input
                type="number"
                className="form-control"
                placeholder="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange} 
              />
            </div>
            <h6>Address</h6>
            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleChange} 
              />
            </div>
            <div className="mb-2">
              <input type="submit" className="btn btn-success" value="Update Contact" />
              <button type="button" className="btn btn-danger m-1" onClick={() => navigate('/contacts/list')}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditContact;
