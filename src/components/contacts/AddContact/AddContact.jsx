import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';

let AddContact = () => {
  const { createContact } = useStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createContact({
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
      <section className="add-contact">
        <div className="container">
          <div className="row">
            <div className="col text-center p-3">
              <p className="h3 text-success fw-bold">Create New Contact</p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
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
                <input type="submit" className="btn btn-success" value="Create Contact" />
                <Link to={'/contacts/list'} className="btn btn-danger m-1">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddContact;
