import React, { Fragment, useContext} from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, NavDropdown, Form,FormControl,Button } from 'react-bootstrap';

const Navbar_keep = ({ title, icon }) => {
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);


    const { isAuthenticated, logout, user } = authContext;
    const { clearContacts } = contactContext;

    const onLogout = () => {
        logout();
        clearContacts();
    }

    const authLinks = (
        <Fragment>
           {/*  <li>Hello { user && user.name} </li>
            <li>
                <a href='#!'>
                    <i className="fas fa-sign-out-alt"></i> <span className="hide-sm">Logout</span>
                </a>
            </li> */}
           
            <NavItem eventkey={1} href="#!">
                <Nav.Link> Hello { user && user.name} </Nav.Link>  
            </NavItem>

            <NavItem eventkey={1} href="#!" onClick={onLogout}>
                <Nav.Link>  <i className="fas fa-sign-out-alt"></i> <span className="hide-sm">Logout</span> </Nav.Link>  
            </NavItem>

        </Fragment>
    )

    const guestLinks = (
        <Fragment>

            <NavItem eventkey={1} href="/register">
                <Nav.Link as={Link} to="/register" >Register</Nav.Link>
            </NavItem>

            <NavItem eventkey={1} href="/login">
                <Nav.Link as={Link} to="/login" >Login</Nav.Link>
            </NavItem>

        </Fragment>
    )

    return (
        <Navbar bg="light" expand="lg" /* fixed="top" */>
            <Navbar.Brand href="#home"> <i className={icon} /> {title} </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavItem eventkey={1} href="/">
                        <Nav.Link as={Link} to="/" >Home</Nav.Link>
                    </NavItem>
                    <NavItem eventkey={1} href="/about">
                        <Nav.Link as={Link} to="/about" >About</Nav.Link>
                    </NavItem>

                    {isAuthenticated ? authLinks : guestLinks }
                 
                </Nav>
                {/* <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form> */}
            </Navbar.Collapse>
        </Navbar>
    )
}

Navbar_keep.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
  };
  
Navbar_keep.defaultProps = {
    title: 'Contacts App',
    icon: 'fas fa-id-card-alt'
  };

export default Navbar_keep
