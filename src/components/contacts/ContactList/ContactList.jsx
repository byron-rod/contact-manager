import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../../store';

let ContactList = () => {
  const { state, deleteContact } = useStore();

  return (
    <>
      <section className="contact-add">
        <div className="container p-3">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3">
                  Contact List
                  <Link to={'/contacts/add'} className="btn btn-success ms-2">
                    <i className="fa-solid fa-user-plus" /> Add Contact
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            {state.contacts.map((contact) => (
              <div className="col-md-6" key={contact.id}>
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4">
                        <img
                          src={contact.avatar}
                          alt="profile-pic"
                          className="img-fluid pp-img"
                        />
                      </div>
                      <div className="col-md-7">
                        <ul className="list-group">
                          <li className="list-group-item list-group-item-action">
                            Name: <span className="fw-bold">{`${contact.first_name} ${contact.last_name}`}</span>
                          </li>
                          <li className="list-group-item list-group-item-action">
                            <i className="fa-solid fa-location-dot" /> Location:{' '}
                            <span className="fw-bold">{contact.location}</span>
                          </li>
                          <li className="list-group-item list-group-item-action">
                            <i className="fa-solid fa-mobile" /> Cellphone:{' '}
                            <span className="fw-bold">{contact.phone}</span>
                          </li>
                          <li className="list-group-item list-group-item-action">
                            <i className="fa-regular fa-envelope" /> Email:{' '}
                            <span className="fw-bold">{contact.email}</span>
                          </li>
                        </ul>
                      </div>
                      <div className="row t-3">
                        <div className="col-md-5 l-5 flex-column align-items-center">
                          <Link
                            to={`/contacts/view/${contact.id}`}
                            className="btn btn-success m-1"
                          >
                            <i className="fa-solid fa-magnifying-glass" />
                          </Link>
                          <Link
                            to={`/contacts/edit/${contact.id}`}
                            className="btn btn-primary m-1"
                          >
                            <i className="fa-regular fa-pen-to-square" />
                          </Link>
                          <button className="btn btn-danger m-1" onClick={() => deleteContact(contact.id)}>
                            <i className="fa-solid fa-trash" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactList;
