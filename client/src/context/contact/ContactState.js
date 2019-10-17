import React, { useReducer } from 'react';
import axios from 'axios';
/* import uuid from 'uuid'; */
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
  } from '../types';

  const ContactState = props => {
      const initialState = {
          //contacts: [
           /*    {
                  id: 1,
                  name: 'abigail',
                  email: 'abigail@gmail.com',
                  phone: '435425',
                  type: 'personal'
              },
              {
                id: 2,
                name: 'Jennifer',
                email: 'Jennifer@gmail.com',
                phone: '47345345',
                type: 'personal'
            } */
          //],
          contacts: null,
          current: null,
          filtered: null,
          error: null
      };

      const [state, dispatch] = useReducer(contactReducer, initialState);

       // get contacts
       const getContacts = async () => {       

        try {
          const res = await axios.get('/api/contacts');
          //console.log(res);
          /*  contact.id = uuid.v4(); */
          dispatch({ 
            type: GET_CONTACTS, 
            payload: res.data
          });
        } catch (err) {
          dispatch({ 
            type: CONTACT_ERROR,
            payload: err.response.msg
          })
        }
     
      }

      // add contacts
      const addContact = async contact => {
        //console.log(contact);
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }

        try {
          const res = await axios.post('/api/contacts', contact, config);
          //console.log(res);
          /*  contact.id = uuid.v4(); */
          dispatch({ 
            type: ADD_CONTACT, 
            payload: res.data
          });
        } catch (err) {
          dispatch({ 
            type: CONTACT_ERROR,
            payload: err.response.msg
          })
        }
     
      }

      //delete contact
      const deleteContact = async id => {
        
        try {
          await axios.delete(`/api/contacts/${id}`);
         
          dispatch({ 
            type: DELETE_CONTACT, 
            payload: id
          });
        } catch (err) {
          dispatch({ 
            type: CONTACT_ERROR,
            payload: err.response.msg
          })
        }
      }

       //update contact
       const updateContact = async contact => {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }

        try {
          const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
          console.log(res);
          /*  contact.id = uuid.v4(); */
          dispatch({ 
            type: UPDATE_CONTACT, 
            payload: res.data
          });
        } catch (err) {
          dispatch({ 
            type: CONTACT_ERROR,
            payload: err.response.msg
          })
        }
      }


      //clear current contacts state
      const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS});
      }

      //set current contact
      const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact});
      }

      //clear curren contact
      const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT});
      }

     
      //filter contacts
      const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text});
      }

      //clear filter
      const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER});
      }
      //console.log(state.contacts)
      return (
        <ContactContext.Provider
        value={{
          contacts: state.contacts,
          current: state.current,
          filtered: state.filtered,
          error: state.error,
          addContact,
          deleteContact,
          setCurrent,
          clearCurrent,
          updateContact,
          filterContacts,
          clearFilter,
          getContacts,
          clearContacts
        }}
    >
      {props.children}
    </ContactContext.Provider>
      );

  };

  export default ContactState;
