import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

const ViewContact = () => {
  const { contactId } = useParams();
  const [contact, setContact] = useState(null);

  const fetchContact = useCallback(async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users/${contactId}`);
      setContact(response.data.data);
    } catch (error) {
      console.error('Error fetching contact:', error);
    }
  }, [contactId]);

  useEffect(() => {
    fetchContact();
  }, [fetchContact]);

  if (!contact) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="view-contact">
        <div className="container">
          <div className="row">
            <div className="col text-center p-3">
              <p className="h3 text-primary fw-bold">View Contact</p>
            </div>
          </div>
        </div>
      </section>
      <section className="view-contact mt-3">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <img
                src={contact.avatar}
                alt="profile-pic"
                className="img-fluid pp-img"
              />
            </div>
            <div className="col-md-9">
              <ul className="list-group">
                <li className="list-group-item list-group-item-action">
                  Name: <span className="fw-bold">{contact.first_name} {contact.last_name}</span>
                </li>
                <li className="list-group-item list-group-item-action">
                  <i className="fa-solid fa-location-dot" /> Location:{" "}
                  <span className="fw-bold">{contact.location}</span>
                </li>
                <li className="list-group-item list-group-item-action">
                  <i className="fa-solid fa-mobile" /> Cellphone:{" "}
                  <span className="fw-bold">{contact.phone}</span>
                </li>
                <li className="list-group-item list-group-item-action">
                  <i className="fa-regular fa-envelope" /> Email:{" "}
                  <span className="fw-bold">{contact.email}</span>
                </li>
              </ul>
              <Link to={"/contacts/list"} className="btn btn-danger m-1">
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ViewContact;
