import React, { createContext, useReducer, useContext, useEffect } from 'react';
import axios from 'axios';

const initialState = {
  contacts: [],
};

const StoreContext = createContext();

const actionTypes = {
  SET_CONTACTS: 'SET_CONTACTS',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };
    default:
      return state;
  }
};

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('https://reqres.in/api/users');
      dispatch({
        type: actionTypes.SET_CONTACTS,
        payload: response.data.data,
      });
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const createContact = async (contactData) => {
    try {
      const response = await axios.post('https://reqres.in/api/users', contactData);
      dispatch({
        type: actionTypes.SET_CONTACTS,
        payload: [...state.contacts, response.data],
      });
    } catch (error) {
      console.error('Error creating contact:', error);
    }
  };

  const updateContact = async (contactId, contactData) => {
    try {
      await axios.put(`https://reqres.in/api/users/${contactId}`, contactData);
      const updatedContacts = state.contacts.map((contact) =>
        contact.id === contactId ? { ...contact, ...contactData } : contact
      );
      dispatch({
        type: actionTypes.SET_CONTACTS,
        payload: updatedContacts,
      });
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const deleteContact = async (contactId) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${contactId}`);
      const filteredContacts = state.contacts.filter((contact) => contact.id !== contactId);
      dispatch({
        type: actionTypes.SET_CONTACTS,
        payload: filteredContacts,
      });
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        state,
        createContact,
        updateContact,
        deleteContact,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export { StoreProvider, useStore };
