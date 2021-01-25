import { session } from 'passport';
import React from 'react';


const Header = ({ title }) => (
    <header>
        <nav id="navbar">
        <i className="material-icons md-36" id="menu-icon">menu</i>
        <h2 id="logo">{title}</h2>
        <i className="material-icons-outlined md-36" id="filter-icon">filter_alt</i>
        </nav>
    </header>
);

export default Header;